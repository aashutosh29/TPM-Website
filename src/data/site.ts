/** NAP + branding — single source of truth for Phase 2 site. */
export const site = {
  name: 'Tiverton Park Manor',
  tagline: 'Retirement living on the shores of Lake Huron',
  phone: '519-368-8800',
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
  /**
   * Years of trusted care shown on the homepage (static; no JS counter).
   * Confirm opening year with ownership if this figure should change.
   */
  yearsOfTrustedCare: 42,
  mapEmbedSrc:
    'https://maps.google.com/maps?q=24%20King%20St%2C%20Tiverton%2C%20ON%20N0G%202T0&z=15&output=embed',
  logoUrl:
    'https://tivertonparkmanor.com/wp-content/uploads/2025/04/bg-removed-logo.png',
  url: 'https://tivertonparkmanor.com',
} as const;

export const mainNav = [
  {
    href: '/living-options/',
    label: 'Living Options',
    children: [
      { href: '/living-options/#studio', label: 'Studio' },
      { href: '/living-options/#standard-single', label: 'Standard Single' },
      { href: '/living-options/#private-suite', label: 'Private Suite' },
      { href: '/living-options/#2-room-suite', label: '2-Room Suite' },
      { href: '/living-options/#couples-suite', label: "Couple's Suite" },
    ],
  },
  { href: '/lifestyle/', label: 'Lifestyle' },
  { href: '/about-us/', label: 'About Us' },
  { href: '/our-team/', label: 'Our Team' },
  { href: '/faqs-page/', label: 'FAQ' },
] as const;

export const footerAbout = [
  { href: '/about-us/', label: 'About Us' },
  { href: '/our-team/', label: 'Our Team' },
  { href: '/schedule-a-tour/', label: 'Schedule a Tour' },
  { href: '/contact/', label: 'Contact' },
] as const;

export const footerAccommodation = [
  { href: '/living-options/#standard-single', label: 'Standard Single' },
  { href: '/living-options/#studio', label: 'Studio' },
  { href: '/living-options/#private-suite', label: 'Private Suite' },
  { href: '/living-options/#couples-suite', label: "Couple's Suite" },
  { href: '/living-options/#2-room-suite', label: '2-Room Suite' },
] as const;

export const footerQuickLinks = [
  { href: '/lifestyle/', label: 'Lifestyle' },
  { href: '/faqs-page/', label: 'FAQ' },
  { href: '/family-portal/', label: 'Family Portal' },
  { href: '/privacy-policy/', label: 'Privacy Policy' },
] as const;

export const socialLinks = [
  { href: '#', label: 'facebook' },
  { href: '#', label: 'instagram' },
  { href: '#', label: 'youtube' },
] as const;