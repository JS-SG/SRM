/**
 * mockData.js
 * Comprehensive initial state and dataset for KKK N&P School.
 * Used by SiteContext and editable dynamically via Central Controller CMS.
 */

export const initialSiteSettings = {
  schoolName: "KKK N&P School",
  schoolFullName: "K K Kumaran Nursery & Primary School",
  tagline: "Where Every Journey Begins",
  subtagline: "Discover • Learn • Grow • Lead",
  motto: "Learning Today • Leading Tomorrow",
  established: 2007,
  affiliation: "Recognized by Govt. of Tamil Nadu (Code: 04-P-022)",
  address: "Main Road, Subbulapuram, Sankarankovil Taluk, Tenkasi District, Tamil Nadu - 627753",
  phone: "+91 94431 82950, +91 98421 76540",
  email: "admissions@kkknpschool.edu.in",
  contactEmail: "info@kkknpschool.edu.in",
  officeHours: "Monday – Saturday: 8:30 AM – 4:30 PM (Sunday Closed)",
  googleMapUrl: "https://maps.google.com/?q=Subbulapuram+Sankarankovil",
  socialLinks: {
    facebook: "https://facebook.com/kkknpschool",
    instagram: "https://instagram.com/kkknpschool",
    youtube: "https://youtube.com/@kkknpschool",
    linkedin: "https://linkedin.com/company/kkknpschool"
  }
};

export const initialHeroSettings = {
  badgeText: "ADMISSIONS OPEN FOR 2026–2027",
  title: "Where Every Journey Begins",
  subtitle: "Nurturing curiosity, character, and academic brilliance in a safe, inspiring international-standard learning environment.",
  videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-students-walking-in-a-school-hallway-40960-large.mp4",
  fallbackPoster: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1920&q=80",
  primaryCtaText: "Explore Our School",
  primaryCtaLink: "/about",
  secondaryCtaText: "Apply for Admissions",
  secondaryCtaLink: "/admissions",
  videoEnabled: true,
  autoplay: true,
  loop: true,
  muted: true
};

export const initialSectionVisibility = {
  hero: true,
  announcementTicker: true,
  welcome: true,
  stats: true,
  whyChooseUs: true,
  programmes: true,
  facilities: true,
  events: true,
  announcements: true,
  achievements: true,
  gallery: true,
  principal: true,
  testimonials: true,
  admissionsCta: true,
  contactSnippet: true
};

export const initialAnnouncements = [
  {
    id: 1,
    title: "Admissions Open for Academic Year 2026–2027",
    category: "Admissions",
    date: "2026-08-25",
    startDate: "2026-08-20",
    expiryDate: "2026-10-30",
    description: "Applications are now invited for Pre-KG through Grade 8 for the upcoming academic session. Early enrollment counseling available.",
    content: "KKK N&P School invites prospective parents to submit applications for Pre-KG, LKG, UKG and Grades 1 to 8 for the academic year 2026–2027. Campus tour slots and interactive counseling sessions are currently open on weekdays.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    attachmentUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    featured: true,
    visible: true
  },
  {
    id: 2,
    title: "Parent-Teacher Interactive Forum & Term Progress Review",
    category: "Academic",
    date: "2026-09-05",
    startDate: "2026-08-28",
    expiryDate: "2026-09-06",
    description: "Scheduled interactive meeting between parents and class mentors to discuss child holistic development and formative milestones.",
    content: "The first term Parent-Teacher Interaction will be held on Saturday, September 5, 2026, from 9:00 AM to 1:00 PM. Parents are requested to adhere to their designated time slots shared via the student handbook.",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
    attachmentUrl: "",
    featured: true,
    visible: true
  },
  {
    id: 3,
    title: "Mid-Term Examination Schedule Released",
    category: "Academic",
    date: "2026-08-28",
    startDate: "2026-08-25",
    expiryDate: "2026-09-20",
    description: "Official timetable and syllabus guidelines for Grades 1 to 8 mid-term assessments are now accessible online.",
    content: "The Mid-Term Examination 2026 commences on September 15, 2026. Practical and oral assessments for primary wings will precede the written papers. Download the attached PDF circular for subject-wise dates.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
    attachmentUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    featured: false,
    visible: true
  },
  {
    id: 4,
    title: "Inter-School Science & Innovation Expo 2026",
    category: "Event",
    date: "2026-09-18",
    startDate: "2026-08-22",
    expiryDate: "2026-09-19",
    description: "Young innovators from 20+ regional schools gather to present working robotics, renewable energy, and eco-sustainable models.",
    content: "Our campus will host the District Level Science and Innovation Fair on September 18. Students from Grade 3 onwards will display working prototypes in the Central Multipurpose Auditorium.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
    attachmentUrl: "",
    featured: true,
    visible: true
  },
  {
    id: 5,
    title: "National Holiday: Gandhi Jayanti Observance",
    category: "Holiday",
    date: "2026-10-02",
    startDate: "2026-09-30",
    expiryDate: "2026-10-03",
    description: "School will remain closed on October 2 in observance of Gandhi Jayanti. Special morning assembly on October 1st.",
    content: "In commemoration of the birth anniversary of Mahatma Gandhi, the school will observe a holiday on October 2, 2026. Classes resume normally on October 3.",
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80",
    attachmentUrl: "",
    featured: false,
    visible: true
  }
];

export const initialEvents = [
  {
    id: 1,
    title: "Annual Sports Day & Athletics Meet 2026",
    category: "Sports",
    date: "2026-09-12",
    time: "08:00 AM – 03:30 PM",
    location: "Main School Sports Arena & Athletic Ground",
    coverImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=800&q=80"
    ],
    description: "A high-energy day of track & field championships, house march-past, obstacle courses, gymnastics displays, and award ceremonies.",
    content: "The annual sports day celebrates athletic excellence, endurance, and teamwork. Students across Blue, Green, Red, and Gold houses will compete for the coveted KKK Champions Trophy.",
    registrationUrl: "https://forms.gle/demo-sports-registration",
    featured: true,
    visible: true
  },
  {
    id: 2,
    title: "Gitanjali Arts & Cultural Festival",
    category: "Cultural",
    date: "2026-09-26",
    time: "09:30 AM – 04:00 PM",
    location: "KKK Tagore Open Air Auditorium",
    coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=800&q=80"
    ],
    description: "An extravaganza of classical Bharatanatyam, contemporary orchestra, theatrical plays, and traditional folk dances by our gifted students.",
    content: "Our annual cultural fiesta gives every student a creative stage to shine. Parents and esteemed guests are cordially invited to enjoy 30+ thematic performances.",
    registrationUrl: "",
    featured: true,
    visible: true
  },
  {
    id: 3,
    title: "Junior STEM & AI Robotics Workshop",
    category: "Academic",
    date: "2026-10-10",
    time: "10:00 AM – 02:00 PM",
    location: "Innovation Hub & Computer Lab 1",
    coverImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Hands-on coding, micro-controller building, and sensor-based robotics challenges guided by leading STEM educators.",
    content: "Designed for young minds from Grades 3 to 8, this hands-on workshop introduces basic robotics, scratch block programming, and autonomous rover assembly.",
    registrationUrl: "https://forms.gle/demo-stem-workshop",
    featured: true,
    visible: true
  },
  {
    id: 4,
    title: "Grandparents Day & Family Heritage Celebration",
    category: "Celebration",
    date: "2026-10-24",
    time: "09:00 AM – 12:30 PM",
    location: "Junior Wing Courtyard",
    coverImage: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Honoring our wisdom pillars with storytelling circles, nostalgic games, student musical dedications, and photo keepsakes.",
    content: "A heartwarming celebration where nursery and primary students honor their beloved grandparents with special musical tributes, handicraft gifts, and tea refreshments.",
    registrationUrl: "",
    featured: false,
    visible: true
  },
  {
    id: 5,
    title: "Young Authors Literature & Book Fair",
    category: "Academic",
    date: "2026-11-06",
    time: "09:00 AM – 04:30 PM",
    location: "Central Library & Courtyard",
    coverImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Interactive author visits, creative writing workshops, book exhibitions, and book costume parades.",
    content: "Encouraging a lifelong love for reading. Publishers from across the country will exhibit children's literature, science encyclopedias, and regional story collections.",
    registrationUrl: "",
    featured: false,
    visible: true
  }
];

export const initialAchievements = [
  {
    id: 1,
    title: "1st Place – State Level Vedic Mathematics Olympiad",
    studentName: "Master R. Kavin & Miss S. Harini",
    category: "Academic",
    badge: "🏆 State Champions",
    date: "2026-07-15",
    description: "Secured Top Gold Rank out of 3,500 participants across Tamil Nadu in rapid mental arithmetic and problem-solving.",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
    certificateUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    featured: true,
    visible: true
  },
  {
    id: 2,
    title: "Inter-School Football Championship Trophy",
    studentName: "Under-12 Boys Varsity Football Team",
    category: "Sports",
    badge: "🥇 Gold Medal",
    date: "2026-06-20",
    description: "Undefeated championship run at the District Interschool Sports Carnival, scoring 18 goals across 5 matches.",
    image: "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=800&q=80",
    certificateUrl: "",
    featured: true,
    visible: true
  },
  {
    id: 3,
    title: "Young Scientist Award – Regional Innovation Expo",
    studentName: "A. Mithran (Grade 5)",
    category: "Science",
    badge: "🔬 Innovation Laureate",
    date: "2026-05-12",
    description: "Developed an automated solar-powered smart irrigation sensor module using indigenous low-cost components.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
    certificateUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    featured: true,
    visible: true
  },
  {
    id: 4,
    title: "National Child Artist Award – Kalakrithi 2026",
    studentName: "P. Ananya (Grade 4)",
    category: "Arts",
    badge: "🎨 National First Prize",
    date: "2026-04-18",
    description: "Her vibrant canvas painting depicting 'Biodiversity in Western Ghats' was honored at the National Lalit Kala Children's Pavilion.",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
    certificateUrl: "",
    featured: true,
    visible: true
  },
  {
    id: 5,
    title: "Best Eco-Friendly Green School Award",
    studentName: "KKK Eco Club & Student Council",
    category: "Leadership",
    badge: "🌱 Green Campus Honor",
    date: "2026-03-10",
    description: "Recognized by District Environmental Council for 100% rainwater harvesting, zero single-use plastic, and organic rooftop vegetable garden.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    certificateUrl: "",
    featured: false,
    visible: true
  }
];

export const initialGallery = [
  {
    id: 1,
    title: "Smart Classroom Interactive Learning",
    description: "Primary students engaging with touch-enabled multimedia boards during mathematics workshop.",
    category: "Academics",
    imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80",
    date: "2026-08-10",
    visible: true
  },
  {
    id: 2,
    title: "Annual Sports Sprint Finale",
    description: "Thrilling 100m sprint race on the synthetic athletic track during Sports Day.",
    category: "Sports",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80",
    date: "2026-07-28",
    visible: true
  },
  {
    id: 3,
    title: "Independence Day Cultural Pageant",
    description: "Students performing patriotic classical dance dressed in traditional attire.",
    category: "Events",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    date: "2026-08-15",
    visible: true
  },
  {
    id: 4,
    title: "Junior Science Laboratory Discoveries",
    description: "Young researchers examining botanical specimens under digital microscopes.",
    category: "Academics",
    imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80",
    date: "2026-06-14",
    visible: true
  },
  {
    id: 5,
    title: "Lush Green Eco-Campus Walkways",
    description: "Morning serene view of our lush green pathways, modern academic blocks, and landscaped gardens.",
    category: "Campus",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    date: "2026-08-01",
    visible: true
  },
  {
    id: 6,
    title: "Fine Arts & Creative Pottery Studio",
    description: "Students exploring clay sculpting and acrylic canvas painting in the art studio.",
    category: "Arts",
    imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    date: "2026-07-19",
    visible: true
  },
  {
    id: 7,
    title: "Happy Smiles in Kindergarten Play Hub",
    description: "Pre-primary children enjoying sensory learning games in the soft-cushioned indoor activity center.",
    category: "Students",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    date: "2026-08-18",
    visible: true
  },
  {
    id: 8,
    title: "Central Library Reading Circle",
    description: "Students immersed in storytelling and encyclopedias in our silent reading lounge.",
    category: "Campus",
    imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80",
    date: "2026-06-30",
    visible: true
  },
  {
    id: 9,
    title: "Annual Day Grand Choir Finale",
    description: "The school symphony and choir performing the school anthem to standing ovations.",
    category: "Celebrations",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    date: "2026-05-25",
    visible: true
  }
];

export const initialProgrammes = [
  {
    id: "early-years",
    title: "Early Childhood (Pre-KG, LKG, UKG)",
    ageGroup: "Ages 2.5 to 5.5 Years",
    badge: "Play-Based Montessori",
    description: "A joyful, nurturing foundation focused on sensory exploration, phonics mastery, socio-emotional warmth, and fine-motor skill development.",
    highlights: [
      "Montessori & Reggio Emilia methodology",
      "Multisensory phonics & early numeracy",
      "Child-safe dedicated play stations",
      "Low teacher-student ratio (1:12)"
    ],
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    visible: true
  },
  {
    id: "primary",
    title: "Primary Wing (Grades 1 – 5)",
    ageGroup: "Ages 6 to 10 Years",
    badge: "Inquiry & Discovery",
    description: "Building deep conceptual understanding in language arts, mathematical logic, science curiosity, and creative self-expression.",
    highlights: [
      "Activity-driven conceptual learning",
      "Integrated STEM & experimental lab hours",
      "Trilingual exposure (English, Tamil, Hindi)",
      "Daily physical education & yoga routines"
    ],
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80",
    visible: true
  },
  {
    id: "middle",
    title: "Middle School (Grades 6 – 8)",
    ageGroup: "Ages 11 to 13 Years",
    badge: "Analytical & Critical Thinking",
    description: "Empowering adolescents with rigorous academic disciplines, computational coding, debate, scientific research, and collaborative project leadership.",
    highlights: [
      "Applied science & digital lab projects",
      "Coding, robotics & AI literacy foundations",
      "Leadership council & community clubs",
      "Competitive Olympiad mentorship"
    ],
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
    visible: true
  },
  {
    id: "senior",
    title: "Secondary Preparation (Grades 9 – 10)",
    ageGroup: "Ages 14 to 15 Years",
    badge: "Academic Mastery",
    description: "Comprehensive preparation for secondary board examinations with personalized doubt-clearing, psychometric career guidance, and Olympiad excellence.",
    highlights: [
      "Rigorous board exam preparation",
      "Dedicated subject specialists & mentors",
      "Career aptitude counseling sessions",
      "State-of-the-art physics & chemistry labs"
    ],
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
    visible: true
  }
];

export const initialFacilities = [
  {
    id: "smart-classrooms",
    title: "Next-Gen Smart Classrooms",
    category: "Academic",
    description: "Ergonomically designed, air-conditioned classrooms equipped with interactive 75-inch 4K panels and high-speed fiber internet.",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80",
    features: ["Interactive 4K Digital Boards", "Climate-controlled acoustic spaces", "Ergonomic posture seating"],
    visible: true
  },
  {
    id: "science-labs",
    title: "Advanced Science Discovery Labs",
    category: "Academic",
    description: "Fully equipped Physics, Chemistry, and Biology laboratories compliant with national safety standards for experiential discovery.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
    features: ["Individual student workstations", "Digital microscopes & safe fume hoods", "Safety eye-wash & fire suppression"],
    visible: true
  },
  {
    id: "computer-lab",
    title: "Coding & AI Computer Lab",
    category: "Technology",
    description: "High-spec workstations configured for Scratch coding, Python programming, robotics interfacing, and graphic design.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    features: ["High-speed fiber connectivity", "Modern dual-core student PCs", "Licensed educational software"],
    visible: true
  },
  {
    id: "library",
    title: "Resource Hub & Central Library",
    category: "Learning",
    description: "Over 12,000 physical titles, national encyclopedias, children's periodicals, and digital e-readers in a serene environment.",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    features: ["12,000+ curated volumes", "Audiobook listening pods", "Quiet research cubicles"],
    visible: true
  },
  {
    id: "sports-arena",
    title: "Multi-Sport Complex & Grounds",
    category: "Sports",
    description: "Expansive multi-acre outdoor athletic grounds with football turf, basketball courts, cricket nets, and indoor badminton.",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
    features: ["Full 200m running track", "Coaching by NIS-certified staff", "Shaded spectator pavilions"],
    visible: true
  },
  {
    id: "auditorium",
    title: "Performing Arts Auditorium",
    category: "Culture",
    description: "A 600-seater acoustic auditorium hosting theatrical productions, guest symposiums, inter-school debates, and celebrations.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    features: ["Surround sound acoustic design", "Theatrical stage lighting rig", "Central air filtration"],
    visible: true
  },
  {
    id: "transport",
    title: "Safe GPS-Tracked Transport",
    category: "Safety",
    description: "Fleet of modern buses equipped with real-time GPS tracking, speed governors, CCTV cameras, and trained female attendants.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    features: ["Live parent mobile app tracking", "First-aid kits & fire extinguishers", "Coverage across 25km radius"],
    visible: true
  },
  {
    id: "dining",
    title: "Hygienic Dining & Pure Water Hub",
    category: "Health",
    description: "Clean dining halls serving wholesome vegetarian refreshments with multi-stage UV/RO mineral water filtration units.",
    image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=800&q=80",
    features: ["Multi-stage commercial RO filtration", "Nutritionally balanced menus", "Stainless steel hygiene standards"],
    visible: true
  },
  {
    id: "medical",
    title: "Campus Wellness & First-Aid Clinic",
    category: "Health",
    description: "Dedicated medical infirmary staffed with a qualified full-time nurse and on-call pediatrician for prompt emergency care.",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80",
    features: ["Full-time registered nurse", "Periodic health & dental checkups", "Tie-up with multi-specialty hospital"],
    visible: true
  }
];

export const initialLeadership = {
  name: "Dr. K. Senthil Kumar, Ph.D., M.Ed.",
  title: "Principal & Academic Director",
  schoolName: "KKK N&P School",
  photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  shortQuote: "Education is not merely the filling of a pail, but the lighting of a lifelong fire of curiosity, integrity, and compassion.",
  fullMessage: `Dear Parents, Students, and Well-Wishers,

Welcome to KKK N&P School, Subbulapuram. Since our inception in 2007, our mission has been firmly rooted in providing quality, accessible, and progressive English-medium education that respects our rich cultural values while equipping young minds with global competencies.

We believe that every child who walks through our gates possesses unique talents waiting to be unlocked. Our dedicated educators create a safe, stimulating, and joyful environment where academic rigour harmonizes with sportsmanship, artistic creativity, and ethical character building.

As we step into the 2026–2027 academic session, we are proud to offer cutting-edge digital learning infrastructure, innovative STEM learning, and an empathetic school community that treats every child as family.

We warmly invite you to visit our campus, interact with our faculty, and partner with us in shaping the bright leaders of tomorrow.`,
  qualifications: "Ph.D. in Educational Pedagogy, M.Ed. (Madurai Kamaraj University), 22+ Years in Educational Leadership",
  visible: true
};

export const initialTestimonials = [
  {
    id: 1,
    name: "S. Meenakshi Sundaram",
    role: "Parent of Harish (Grade 4)",
    type: "Parent",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    quote: "KKK N&P School has transformed our son's confidence. The teachers are exceptionally warm and attentive. The smart classrooms and hands-on science activities make learning effortless and enjoyable!",
    visible: true
  },
  {
    id: 2,
    name: "P. Rajeshwari, M.Tech",
    role: "Parent of Divya (Grade 2)",
    type: "Parent",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    quote: "The safety standards, clean green campus, and personalized care given to young learners are second to none in this region. My daughter loves going to school every single morning.",
    visible: true
  },
  {
    id: 3,
    name: "K. Vignesh",
    role: "Alumni (Batch of 2018), Currently Software Engineer",
    type: "Alumni",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    quote: "The strong foundational English fluency, public speaking exposure, and mathematical discipline I received at KKK School became the springboard for my engineering career.",
    visible: true
  },
  {
    id: 4,
    name: "T. Selvaraj",
    role: "Parent of Kavin (Grade 5)",
    type: "Parent",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    quote: "From sports coaching to robotics workshops, KKK School provides opportunities you'd only expect in metro cities, right here in Subbulapuram. We are proud to be part of this family.",
    visible: true
  }
];

export const initialStats = [
  { label: "Years of Excellence", value: 19, suffix: "+", description: "Serving generations since 2007" },
  { label: "Happy Students", value: 1250, suffix: "+", description: "Nursery through Grade 8" },
  { label: "Expert Faculty", value: 65, suffix: "+", description: "Passionate certified mentors" },
  { label: "Campus Area", value: 5, suffix: " Acres", description: "Green, secure & serene grounds" },
  { label: "Student Pass Rate", value: 100, suffix: "%", description: "Consistent academic brilliance" }
];
