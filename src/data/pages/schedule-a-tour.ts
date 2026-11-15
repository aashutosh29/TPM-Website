export const scheduleTourPage = {
  metaTitle: 'Schedule A Tour - Tiverton Park Manor',
  h1: 'Schedule A Tour',
  heading: 'Book A Tour',
  intro:
    'Book a tour to discover the plan that best fits your lifestyle.This is the request date. The confirmed booking date may vary. We will contact you via email or phone to verify the date. Thank you.',
  heroImage: '/images/DSC2550-1024x678.jpg',
  timeOptions: [
    '08:00 am', '09:00 am', '10:00 am', '11:00 am', '12:00 pm', '01:00 pm',
    '02:00 pm', '03:00 pm', '04:00 pm', '05:00 pm', '06:00 pm', '07:00 pm',
    '08:00 pm', '09:00 pm',
  ],
  audienceOptions: ['Myself', 'A family member', 'A Friend'],
  /** Live WP select labels/values are mismatched — mirrored here. */
  interestOptions: [
    { label: 'Studio', value: 'Standard Single' },
    { label: 'Standard Single', value: 'Private Suite' },
    { label: 'Private Suite', value: '2-Room Suite' },
    { label: '2-Room Suite', value: "Couple's Suite" },
  ],
} as const;