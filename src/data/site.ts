/** Live NAP + branding (matches tivertonparkmanor.com). */
export const site = {
  name: 'Tiverton Park Manor',
  tagline: 'Retirement living on the shores of Lake Huron',
  phone: '519-368-8800',
  phoneDisplayAlt: '(519) 368-8800',
  phoneTel: '+15193688800',
  email: 'manager@tivertonparkmanor.com',
  address: {
    street: '24 King St',
    city: 'Tiverton',
    province: 'ON',
    postal: 'N0G 2T0',
    country: 'Canada',
    formatted: '24 King St, Tiverton, ON N0G 2T0',
  },
  /** Live DOM initial counter (before JS); Divi data-to-value=22 */
  yearsCounterLive: 0,
  yearsCounterDiviTarget: 22,
  logoUrl:
    'https://tivertonparkmanor.com/wp-content/uploads/2025/04/bg-removed-logo.png',
  url: 'https://tivertonparkmanor.com',
} as const;

export const mainNav = [
  { href: '/services/', label: 'Services', external: true, liveOnly: true },
  {
    href: '/living-options/',
    label: 'Living Options',
    children: [
      { href: '/living-options/', label: 'Studio' },
      { href: '/livings/private-suite/', label: 'Private Suite', liveOnly: true },
      { href: '/livings/standard-single/', label: 'Standard Single', liveOnly: true },
      { href: '/livings/2-room-suite/', label: '2- Room Suite', liveOnly: true },
      { href: '/livings/couples-suite/', label: 'Couple’s Suite', liveOnly: true },
    ],
  },
  { href: '/about-us/', label: 'About Us' },
  { href: '/our-team/', label: 'Our Team' },
  { href: '/faqs-page/', label: 'FAQ' },
] as const;

export const footerAbout = [
  { href: '/services/', label: 'Services' },
  { href: '/our-team/', label: 'Our Team' },
  { href: '/schedule-a-tour/', label: 'Scheldule a Tour' },
  { href: '/about-us/', label: 'about us' },
] as const;

export const footerAccommodation = [
  { href: '/livings/standard-single/', label: 'Standard Single' },
  { href: '/livings/studio/', label: 'Studio' },
  { href: '/livings/private-suite/', label: 'Private Suite' },
  { href: '/livings/couples-suite/', label: "Couple's Suite" },
  { href: '/livings/2-room-suite/', label: '2-room Suite' },
] as const;

export const footerQuickLinks = [
  { href: '/lifestyle/', label: 'Lifestyle' },
  { href: '#', label: 'Policy' },
] as const;

export const socialLinks = [
  { href: '#', label: 'facebook' },
  { href: '#', label: 'instagram' },
  { href: '#', label: 'youtube' },
] as const;