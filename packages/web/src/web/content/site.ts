// All editable website content lives here. Update text, phone, prices and
// reviews in this one file.

export const site = {
  name: "Yoga180",
  teacher: "Asha Panchal",
  phoneDisplay: "+1 647-785-1243",
  phoneE164: "+16477851243",
  whatsapp: "16477851243", // digits only, with country code
  address: "28 Ferri Crescent, Brampton, ON L6Z 1R9",
  area: "Brampton, Ontario",
  googleRating: 5.0,
  googleReviewCount: 14,
  googleReviewsUrl: "https://share.google/XzsnUVTYTGlyWXod8",
  googleMapsUrl:
    "https://www.google.com/maps/place/Yoga180/@43.7228336,-79.8058693,17z/data=!4m6!3m5!1s0x882b175b3735e0d7:0xbf90153aed0599f9!8m2!3d43.7228336!4d-79.8058693!16s%2Fg%2F11xvlp9kc9",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Yoga180,+28+Ferri+Crescent,+Brampton,+ON+L6Z+1R9&z=15&output=embed",
  // Add links when available — empty ones are hidden automatically.
  social: {
    instagram: "",
    facebook: "",
    youtube: "",
  },
  certification: {
    title: "200-Hour Yoga Teacher Training",
    school: "World Peace Yoga School, Rishikesh",
    styles: "Hatha & Ashtanga Yoga",
    standard: "Yoga Alliance USA (RYS 200)",
    yaId: "143420",
    year: "2018",
  },
};

export const whatsappLink = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const smsLink = (text: string) =>
  `sms:${site.phoneE164}?&body=${encodeURIComponent(text)}`;

export const telLink = `tel:${site.phoneE164}`;

export type ClassItem = {
  title: string;
  caption: string;
  description: string;
  image: string;
  price: string | null; // null → shows "Ask about pricing"
};

export const classes: ClassItem[] = [
  {
    title: "Hatha Foundations",
    caption: "Small group · All levels",
    description:
      "Slow, well-cued postures with breath awareness. The ideal place to start, or to rebuild a steady practice.",
    image: "/images/asha-fold.jpg",
    price: null,
  },
  {
    title: "Ashtanga Flow",
    caption: "Small group · Strength & balance",
    description:
      "A stronger, breath-linked sequence to build heat, flexibility and focus — progressed at your own pace.",
    image: "/images/student-warrior.jpg",
    price: null,
  },
  {
    title: "Private Sessions",
    caption: "One-to-one · Tailored",
    description:
      "A practice designed around your body, goals and schedule — flexibility, back care, stress or mobility.",
    image: "/images/class-7.jpg",
    price: null,
  },
];

export const schedule: { day: string; sessions: string[] }[] = [
  { day: "Monday", sessions: ["6:00 – 8:00 AM", "5:00 – 8:00 PM"] },
  { day: "Tuesday", sessions: ["6:00 – 8:00 AM", "5:00 – 8:00 PM"] },
  { day: "Wednesday", sessions: ["6:00 – 8:00 AM", "5:00 – 8:00 PM"] },
  { day: "Thursday", sessions: ["6:00 – 8:00 AM", "5:00 – 8:00 PM"] },
  { day: "Friday", sessions: ["6:00 – 8:00 AM", "5:00 – 8:00 PM"] },
  { day: "Saturday", sessions: ["7:30 – 9:30 AM"] },
  { day: "Sunday", sessions: ["7:30 – 9:30 AM · Demo availability"] },
];

export const reviews: { name: string; when: string; text: string }[] = [
  {
    name: "Himani Aggarwal",
    when: "Google review",
    text: "From the very first class, Asha has created a welcoming and positive environment. She explains each pose clearly and encourages everyone to move at their own pace. After each session, I feel more relaxed, balanced, and energized.",
  },
  {
    name: "Brajesh Kumar",
    when: "Google review",
    text: "Within just two months I can already feel a big difference. Earlier, even simple bending was difficult for me, but now I'm much more flexible, can hold poses longer, and I've even started moving into more advanced postures with confidence.",
  },
  {
    name: "Damanpreet Singh Mundair",
    when: "Google review",
    text: "After every session, I feel so refreshed, energetic, and relaxed — both mentally and physically. I've also noticed better sleep, less stress, and an overall sense of positivity since starting yoga with her.",
  },
  {
    name: "Shreeya Singhania",
    when: "Google review",
    text: "Her instructions are clear, her energy is uplifting, and she makes sure everyone — from beginners to experienced yogis — feels comfortable and supported. Every class leaves me feeling refreshed, stronger, and more centered.",
  },
  {
    name: "Prempreet Dhimann",
    when: "Google review",
    text: "I recently joined yoga with Asha and I'm already feeling such a positive difference. I feel more relaxed, flexible, and energetic. So happy I decided to start!",
  },
];

export const gallery: { src: string; alt: string; tall?: boolean; caption?: string }[] = [
  { src: "/images/asha-twist.jpg", alt: "Asha in a seated spinal twist" },
  { src: "/images/student-star.jpg", alt: "Student practice outdoors on the grass", tall: true, caption: "Student practice" },
  { src: "/images/asha-bridge.jpg", alt: "Asha in bridge pose" },
  { src: "/images/class-2.jpg", alt: "Students holding side plank in the Yoga180 studio", caption: "Student practice" },
  { src: "/images/asha-fold.jpg", alt: "Asha in a standing forward fold", tall: true },
  { src: "/images/student-squat.jpg", alt: "Student practice outdoors — garland squat", caption: "Student practice" },
  { src: "/images/asha-online.jpg", alt: "Asha teaching a live online class from her studio" },
  { src: "/images/class-7.jpg", alt: "Student in Dancer's pose", tall: true, caption: "Student practice" },
  { src: "/images/student-boat.jpg", alt: "Student practice outdoors — boat pose", caption: "Student practice" },
  { src: "/images/asha-bow.jpg", alt: "Asha demonstrating a reclined toe-hold pose", tall: true },
  { src: "/images/class-1.jpg", alt: "Student in a supported leg raise on the mat", caption: "Student practice" },
  { src: "/images/student-standing.jpg", alt: "Student practice outdoors — mountain pose", tall: true, caption: "Student practice" },
  { src: "/images/class-5.jpg", alt: "Student resting in a forward fold", tall: true, caption: "Student practice" },
  { src: "/images/student-warrior.jpg", alt: "Student practice outdoors — Warrior II", caption: "Student practice" },
];

// "Her Journey" — Rishikesh teacher training
export const journey = {
  feature: {
    src: "/images/rishikesh-riverbank.jpg",
    alt: "Asha seated in meditation with a mudra on a rock on the bank of the Ganga in Rishikesh",
    caption: "Practising on the bank of the Ganga",
  },
  batch: {
    src: "/images/rishikesh-batch.jpg",
    alt: "Asha's teacher-training batch at World Peace Yoga School, seated together on the ghat steps in Rishikesh",
    caption: "Her teacher-training batch at World Peace Yoga School — classmates from all over the world",
  },
  friends: {
    src: "/images/rishikesh-ghat-4.jpg",
    alt: "Asha practising shoulder stand with fellow students on the riverside ghats",
    caption: "Practising with friends by the river",
  },
  photos: [
    { src: "/images/rishikesh-certificate.jpg", alt: "Asha receiving her teacher-training certificate from the school principal in Rishikesh", caption: "Receiving her certificate from the principal" },
    { src: "/images/rishikesh-ghat-3.jpg", alt: "Morning practice on the ghats of the Ganga, temple across the river", caption: "Morning practice on the Ganga ghats" },
    { src: "/images/rishikesh-ghat-1.jpg", alt: "Teacher-training group practising on mats by the Ganga", caption: "Classmates from around the world" },
    { src: "/images/rishikesh-asha.jpg", alt: "Asha smiling during her training in Rishikesh", caption: "Asha in Rishikesh" },
    { src: "/images/rishikesh-ghat-2.jpg", alt: "Students seated in meditation on the ghats with the Himalayan foothills behind", caption: "Meditation at the foothills" },
  ],
};

export const faqs: { q: string; a: string }[] = [
  {
    q: "I've never done yoga. Is that okay?",
    a: "Absolutely. Most students start as beginners. Every pose is explained clearly with options, and you always move at your own pace.",
  },
  {
    q: "Where are classes held?",
    a: `In a calm, plant-filled home studio at ${"28 Ferri Crescent, Brampton"} — close to Loafer's Lake. Groups are kept small so everyone gets attention.`,
  },
  {
    q: "Do you offer online classes?",
    a: "Yes — Asha teaches live online classes by video call. You see and hear her in real time, and she can see you to guide your alignment. All you need is a mat and a phone, tablet or laptop.",
  },
  {
    q: "What should I bring?",
    a: "Comfortable clothes and a water bottle. Bring your own mat if you have one — if not, let Asha know when you book.",
  },
  {
    q: "How do I book my first class?",
    a: "Use the Book a call form, tap WhatsApp, or simply call or text. Asha will confirm your spot and answer any questions.",
  },
  {
    q: "Do you offer private sessions?",
    a: "Yes — one-to-one sessions can be tailored for flexibility, back care, stress relief or a specific goal. Ask about times.",
  },
  {
    q: "How much do classes cost?",
    a: "Message on WhatsApp or book a call and Asha will share current pricing for group and private sessions.",
  },
];
