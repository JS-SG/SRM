// School Events Data
// Note: All entries are sample/demo event records for UI demonstration.

export const initialEventsData = [
  {
    id: "event-1",
    title: "Annual Sports Meet & Athletic Day (Sample Event)",
    category: "Sports Day",
    date: "2026-09-15",
    displayDate: "September 15, 2026",
    time: "8:30 AM – 1:30 PM",
    location: "School Playground, Subbulapuram",
    type: "upcoming",
    featured: true,
    isSample: true,
    image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&q=80&w=800",
    shortDesc: "Annual athletic competitions, sprint races, relay heats, and prize distribution for all primary grades.",
    fullDescription: "A celebration of youthful energy, sportsmanship, and teamwork on our school playground. Students from Grade 1 to 5 along with Pre-Primary children will participate in customized athletic games, sprint tracks, sack races, and fun team activities.",
    highlights: [
      "March past and opening oath by student houses",
      "Running races (50m, 100m) and shuttle relays",
      "Fun obstacle games for Pre-Primary children",
      "Prize and medal distribution ceremony for winners",
      "Parent-teacher tug-of-war showcase event"
    ],
    audience: "All Students, Parents & Well-wishers",
    coordinator: "Physical Education Coordinator"
  },
  {
    id: "event-2",
    title: "Primary Science & Nature Activity Day (Sample Event)",
    category: "Science Activity",
    date: "2026-10-10",
    displayDate: "October 10, 2026",
    time: "9:00 AM – 2:00 PM",
    location: "Classrooms & School Grounds",
    type: "upcoming",
    featured: false,
    isSample: true,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800",
    shortDesc: "Hands-on simple science experiments, plant observation, and interactive nature models made by students.",
    fullDescription: "Encouraging early scientific inquiry and curiosity. Primary students will showcase simple science projects, plant growth charts, water cycle diagrams, and basic interactive demonstrations guided by faculty.",
    highlights: [
      "Live seed germination and plant growth exhibits",
      "Simple magnet and reflection optical demonstrations",
      "Demonstration of basic computer learning applications",
      "Interactive quiz on environmental conservation",
      "Certificate of curiosity for every participant"
    ],
    audience: "Grades 1 to 5 Students & Teachers",
    coordinator: "Science & EVS Faculty"
  },
  {
    id: "event-3",
    title: "Children's Day & Cultural Fest (Sample Event)",
    category: "Cultural Event",
    date: "2026-11-14",
    displayDate: "November 14, 2026",
    time: "9:30 AM – 1:00 PM",
    location: "School Main Courtyard",
    type: "upcoming",
    featured: true,
    isSample: true,
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800",
    shortDesc: "Joyful celebration filled with rhymes, fancy dress, folk dances, and cultural storytelling presentations.",
    fullDescription: "Dedicated to celebrating childhood joy and cultural talents. The fest includes traditional folk songs, poetry recitation in English and Tamil, fancy dress presentations by pre-primary kids, and fun games.",
    highlights: [
      "Traditional Tamil folk songs and group dance",
      "Pre-Primary fancy dress parade",
      "English poem recitation and storytelling circles",
      "Special sweets and gift distribution for children",
      "Art and drawing exhibition display"
    ],
    audience: "Open to All School Community",
    coordinator: "Cultural Committee Lead"
  },
  {
    id: "event-4",
    title: "Annual Day & Awards Ceremony (Sample Event)",
    category: "Annual Day",
    date: "2026-03-20",
    displayDate: "March 20, 2026",
    time: "4:00 PM – 7:30 PM",
    location: "School Campus Grounds, Subbulapuram",
    type: "past",
    featured: false,
    isSample: true,
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800",
    shortDesc: "Grand annual gathering highlighting academic growth, student excellence, and colorful stage performances.",
    fullDescription: "Our annual review celebrating the year's milestones, classroom achievements, library reader recognitions, and vibrant student cultural programs.",
    highlights: [
      "Annual school report presentation",
      "Academic proficiency and good attendance recognition",
      "125-Book Library Top Reader badges awarded",
      "Stage drama and multilingual choral performances",
      "Vote of thanks and community appreciation"
    ],
    audience: "Entire School Community & Guests",
    coordinator: "School Head Master"
  },
  {
    id: "event-5",
    title: "77th Republic Day Celebration (Sample Event)",
    category: "Republic Day",
    date: "2026-01-26",
    displayDate: "January 26, 2026",
    time: "8:00 AM – 10:30 AM",
    location: "School Entrance & Assembly Area",
    type: "past",
    featured: false,
    isSample: true,
    image: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&q=80&w=800",
    shortDesc: "National tricolor flag hoisting, patriotic songs, and student speeches commemorating the Constitution of India.",
    fullDescription: "Instilling patriotic pride and constitutional values in young citizens. Events included flag hoisting, national anthem recitation, patriotic slogans, and sweet distribution.",
    highlights: [
      "Ceremonial National Flag unfurling",
      "National Anthem and patriotic songs by choir",
      "Inspiring student speeches on great national leaders",
      "Distribution of commemorative badges and sweets"
    ],
    audience: "Students, Staff & Village Community",
    coordinator: "General Studies Faculty"
  },
  {
    id: "event-6",
    title: "Library Reading & Storytelling Week (Sample Event)",
    category: "School Celebration",
    date: "2026-02-12",
    displayDate: "February 12, 2026",
    time: "10:00 AM – 12:30 PM",
    location: "School Library (125 Books Section)",
    type: "past",
    featured: false,
    isSample: true,
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800",
    shortDesc: "Interactive storytelling circles, picture book reading, and bookmark crafting in our school library.",
    fullDescription: "A special reading initiative making full use of our 125-book library collection. Students learned book handling, shared favorite stories, and engaged in expressive reading.",
    highlights: [
      "Guided picture book reading for early grades",
      "Bilingual storytelling by teachers in English and Tamil",
      "Handmade bookmark making workshop",
      "Student book review presentations"
    ],
    audience: "Primary Grades 1 to 5",
    coordinator: "Library In-Charge"
  }
];

export const eventCategories = [
  "All",
  "Annual Day",
  "Sports Day",
  "Independence Day",
  "Republic Day",
  "Cultural Event",
  "Science Activity",
  "School Celebration"
];
