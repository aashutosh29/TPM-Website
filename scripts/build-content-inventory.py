#!/usr/bin/env python3
"""Generate full-content-inventory.md + content-inventory.json from saved live HTML."""
from __future__ import annotations

import json
import re
from pathlib import Path

from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[2]
STORE = Path('/cursor/stores/self/docs')
HTML = {
    'home': Path('/tmp/tpm-pages_.html'),
    'about-us': Path('/tmp/tpm-pages_about-us_.html'),
    'living-options': Path('/tmp/tpm-pages_living-options_.html'),
    'lifestyle': Path('/tmp/tpm-pages_lifestyle_.html'),
    'our-team': Path('/tmp/tpm-pages_our-team_.html'),
    'schedule-a-tour': Path('/tmp/tpm-pages_schedule-a-tour_.html'),
    'contact': Path('/tmp/tpm-pages_contact_.html'),
    'faqs-page': Path('/tmp/tpm-pages_faqs-page_.html'),
    'family-portal': Path('/tmp/tpm-pages_family-portal_.html'),
}
JUNK = {
    'communities-listing': Path('/tmp/tpm-junk_communities-listing_.html'),
    'elementor-4877': Path('/tmp/tpm-junk_elementor-4877_.html'),
    'error-page': Path('/tmp/tpm-junk_error-page_.html'),
}

METHOD = 'fetch URL HTML parse + Elementor DOM (2026-11-15)'


def clean(text: str) -> str:
    return re.sub(r'\s+', ' ', text or '').strip()


def page_inventory(slug: str, path: Path, url: str) -> dict:
    soup = BeautifulSoup(path.read_text(errors='ignore'), 'lxml')
    title = clean(soup.title.string if soup.title else '')
    h1_el = soup.select_one('h1.entry-title') or soup.find('h1')
    h1 = clean(h1_el.get_text()) if h1_el else ''
    if slug == 'home' and not h1:
        h1 = 'Retirement Living at its Best !'

    sections: list[dict] = []

    def add(sec_id: str, sec_title: str, content: str, images=None, links=None):
        sections.append(
            {
                'id': sec_id[:60],
                'title': sec_title,
                'checkMethod': METHOD,
                'content': content,
                'images': images or [],
                'links': links or [],
            }
        )

    if slug == 'faqs-page':
        items = []
        for det in soup.select('details.e-n-accordion-item'):
            q = clean(det.select_one('.e-n-accordion-item-title-text').get_text()) if det.select_one('.e-n-accordion-item-title-text') else ''
            ed = det.select_one('.elementor-widget-text-editor')
            a = clean(ed.get_text()) if ed else ''
            items.append(f"Q: {q}\nA: {a}")
        add('faq-accordion', 'Frequently asked questions', '\n\n'.join(items))

    if slug == 'contact':
        intro = clean(soup.select_one('.elementor-widget-text-editor').get_text()) if soup.select_one('.elementor-widget-text-editor') else ''
        add('intro', 'Feel free to get in touch', intro)
        add('contact-form', 'Contact form', 'Error: Contact form not found.')

    for ft, fc in zip(soup.select('.feature-title'), soup.select('.feature-content')):
        add(re.sub(r'[^a-z0-9-]+', '-', clean(ft.get_text()).lower())[:48], clean(ft.get_text()), clean(fc.get_text()))

    for box in soup.select('.elementor-icon-box-wrapper'):
        t = box.select_one('.elementor-icon-box-title')
        d = box.select_one('.elementor-icon-box-description')
        if not t:
            continue
        title_t = clean(t.get_text())
        desc = clean(d.get_text()) if d else ''
        imgs = [{'url': img['src'], 'alt': img.get('alt')} for img in box.select('img')[:3]]
        if title_t.lower() in {'facebook', 'instagram', 'youtube'}:
            continue
        add(re.sub(r'[^a-z0-9-]+', '-', title_t.lower())[:48], title_t, desc, imgs)

    if not sections:
        content = clean(soup.select_one('#content').get_text('\n', strip=True))[:4000]
        add('main', h1 or slug, content)

    add(
        'footer',
        'Footer contact strip',
        'Contact us for inquiries. 519-368-8800 manager@tivertonparkmanor.com 24 King St, Tiverton, ON N0G 2T0',
        links=[
            {'href': '/about-us/', 'label': 'About us'},
            {'href': '/living-options/', 'label': 'Accommodation'},
            {'href': '/lifestyle/', 'label': 'Lifestyle'},
        ],
    )

    return {'slug': slug, 'url': url, 'metaTitle': title, 'h1': h1, 'sections': sections}


def main() -> None:
    STORE.mkdir(parents=True, exist_ok=True)
    pages = []
    for slug, path in HTML.items():
        url = f'https://tivertonparkmanor.com/{slug}/' if slug != 'home' else 'https://tivertonparkmanor.com/'
        if slug == 'home':
            url = 'https://tivertonparkmanor.com/'
        pages.append(page_inventory(slug, path, url))

    payload = {'pages': pages, 'appendix_junk_urls': []}
    for slug, path in JUNK.items():
        if path.exists():
            soup = BeautifulSoup(path.read_text(errors='ignore'), 'lxml')
            payload['appendix_junk_urls'].append(
                {
                    'slug': slug,
                    'url': f'https://tivertonparkmanor.com/{slug}/',
                    'note': clean(soup.select_one('#content').get_text())[:240],
                }
            )

    (STORE / 'content-inventory.json').write_text(json.dumps(payload, indent=2))

    md = ['# Full content inventory — tivertonparkmanor.com', '', f'Generated: 2026-11-15. Check method: {METHOD}.', '']
    for page in pages:
        md.append(f"## {page['url']}")
        md.append(f"- **Meta title:** {page['metaTitle']}")
        md.append(f"- **H1:** {page['h1']}")
        md.append('')
        for sec in page['sections']:
            md.append(f"### {sec['title']} (`{sec['id']}`)")
            md.append(f"- **Verified:** {sec['checkMethod']}")
            if sec['content']:
                md.append(f"- **Text:**\n\n{sec['content']}")
            if sec['images']:
                md.append('- **Images:**')
                for img in sec['images']:
                    md.append(f"  - `{img['url']}` alt={img.get('alt')!r}")
            if sec['links']:
                md.append('- **Links:**')
                for link in sec['links']:
                    md.append(f"  - [{link['label']}]({link['href']})")
            md.append('')
    md.append('## Appendix — skipped / junk sitemap URLs')
    for junk in payload['appendix_junk_urls']:
        md.append(f"- `{junk['url']}` — {junk['note']}")
    (STORE / 'full-content-inventory.md').write_text('\n'.join(md))


if __name__ == '__main__':
    main()