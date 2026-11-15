/** Single source of truth for name, address, phone (NAP). */
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
  /** Established ~2016; update if official opening year differs. */
  yearsOfTrustedCare: 10,
  url: 'https://tivertonparkmanor.com',
} as const;

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/living-options', label: 'Living Options' },
  { href: '/lifestyle', label: 'Lifestyle' },
  { href: '/team', label: 'Team' },
  { href: '/faqs', label: 'FAQs' },
  { href: '/contact', label: 'Contact' },
  { href: '/schedule-a-tour', label: 'Schedule a Tour' },
] as const;