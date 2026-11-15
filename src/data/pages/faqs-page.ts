const duplicateAnswer =
  'The cost of Independent Living varies by many factors including the location and the services and amenities provided. Many of the costs are included in rent, making budgeting for monthly expenses easier. Compared to other lifestyle options, Independent Living is usually cheaper than assisted living.';

/** Live site duplicate FAQ answers (Phase 1 clone — do not dedupe). */
export const faqsPage = {
  metaTitle: 'FAQs Page - Tiverton Park Manor',
  h1: 'FAQs Page',
  eyebrow: 'popular questions',
  heading: 'Frequently asked questions',
  items: [
    { q: 'What is the cost of Independent Living?', a: duplicateAnswer },
    { q: 'What is the age requirement for Independent Living?', a: duplicateAnswer },
    { q: 'What’s the difference between Independent Living and other?', a: duplicateAnswer },
    { q: 'What services does Independent Living provide?', a: duplicateAnswer },
    { q: 'Is Independent Living Right for You?', a: duplicateAnswer },
  ],
} as const;