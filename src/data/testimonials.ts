// Seed data for the homepage Google Reviews widget.
// Real reviews from the Vera Visa Agency Google Business Profile, supplied 2026-06-30.
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
    quote: 'I walked in unsure about my visa options, but left with the best experience I’ve had in months. The staff at Vera Visa Agency Chiang Mai were incredibly professional and patient, answering all of my questions and guiding me through every step. Their visa service was efficient and the whole process felt smooth and stress‑free. I highly recommend this visa agency to anyone looking for reliable help.',
  },
  {
    name: 'Gabriele',
    visaType: 'Marriage (O · Spouse)',
    rating: 5,
    quote: "I used Vera Visa's services to convert a tourist visa into a marriage visa. They are very professional and kind, with a very competitive price. Highly recommended!",
  },
  {
    name: 'Katty Lar',
    visaType: 'Education (ED)',
    rating: 5,
    quote: 'I have been using Vera Visa Agency’s services for a few years now and they have always been helpful and efficient! I trust them with my hassle-free visa extension, timely 90-day reports, help with finding the best language course and a friendly class, which makes my educational process and stay in Thailand much more enjoyable! They always give me the latest updates and assist at the Chiang Mai Immigration on my visa extension day, which makes the whole process smooth and quick. Very trustworthy company - Highly recommend!',
  },
  {
    name: 'Monica Sath',
    visaType: 'Visa Services',
    rating: 5,
    quote: 'I’m so grateful for the services with Vera Visa. They answered all my pesky questions with helpful information or reliable sources. They’ve gone above and beyond for me through multiple years in the Visa process and helping me and my family through tricky situations. Their knowledge and connections are invaluable. They’ve also helped make the process as easy as possible for me and saved me so much time, quite often. Thank you all!!',
  },
  {
    name: 'Mee Khin',
    visaType: 'Visa Services',
    rating: 5,
    quote: 'I was nervous at first, but the staff at Vera Visa Agency Chiang Mai made me feel completely comfortable. They explained every step of the process clearly and answered all my questions quickly. Their helpful attitude and thorough guidance turned a stressful visa application into a smooth experience. I highly recommend them to anyone looking for reliable visa services and the best visa agent in Chiang Mai.',
  },
  {
    name: 'Thai Anime',
    visaType: 'Visa Services',
    rating: 5,
    quote: 'I had a great experience with Vera Visa Agency Chiang Mai. The staff were incredibly responsive and helpful, answering all my questions quickly. Their process was very organized and the team showed deep knowledge about the visa requirements. I felt confident and reassured throughout, and the service was prompt from start to finish. I would definitely recommend them to anyone looking for reliable visa services.',
  },
  {
    name: 'Tim Lambs',
    visaType: 'Visa Services',
    rating: 5,
    quote: 'I had a great experience with Vera Visa Agency. They handled everything professionally and were fast to answer all my questions. They managed my documents and my visa application smoothly from start to finish, keeping me updated about every step of the process, saving me time and stress. Highly recommend.',
  },
  {
    name: 'Leo Aung',
    visaType: 'Visa Services',
    rating: 5,
    quote: 'I was very impressed with the efficient visa processing assistance at Vera Visa Agency Chiang Mai. The staff handled my documents quickly and explained everything clearly, making the whole process stress free. I’m excited to return for my next visa service.',
  },
];

export const overallRating = 5.0;
// [Draft] This is the count of reviews seeded above, not necessarily the total
// shown on the Google Business Profile — update to the real total before launch,
// or wire up the Google Places API (see PLAN.md upgrade path).
export const reviewCount = 8;
