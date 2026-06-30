// Seed data for the homepage Google Reviews widget.
// [Draft] Only "Yi Mon Thant" is a confirmed real review carried over from the
// current site. The rest are placeholders — replace with real Google Business
// Profile reviews before launch, or wire up the Google Places API (see PLAN.md).
export interface Testimonial {
  name: string;
  visaType: string;
  rating: number;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Yi Mon Thant',
    visaType: 'DTV',
    rating: 5,
    quote: 'Efficient, professional, and completely stress-free from start to finish. They knew exactly what immigration needed.',
  },
  {
    name: 'Robert H.',
    visaType: 'Retirement (O-A)',
    rating: 5,
    quote: '[Draft — replace with real review] Handled my bank deposit timing perfectly and walked me through every document. Renewed without a single issue.',
  },
  {
    name: 'Claire M.',
    visaType: 'Marriage (O)',
    rating: 5,
    quote: "[Draft — replace with real review] My husband and I had no idea where to start. Vera Visa explained everything clearly and got it done in days.",
  },
  {
    name: 'Daniel K.',
    visaType: 'DTV',
    rating: 5,
    quote: '[Draft — replace with real review] Applied for the e-visa with their guidance — approved in three weeks. Highly recommend for remote workers.',
  },
  {
    name: 'Sarah W.',
    visaType: 'Education (ED)',
    rating: 5,
    quote: '[Draft — replace with real review] They matched me with a great Thai language school and handled the visa side completely.',
  },
];

export const overallRating = 5.0;
export const reviewCount = 47; // [Draft] replace with real Google review count
