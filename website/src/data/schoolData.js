// Official School Information Data for K K KUMARAN N&PS, SUBBULAPURAM
// Strictly based on official school registry information.

export const schoolData = {
  name: "K K KUMARAN N&PS, SUBBULAPURAM",
  shortName: "K K K N&PS",
  altName: "K K K NURSERY & PRIMARY SCHOOL, SUBBULAPURAM",
  tagline: "Learning Today • Leading Tomorrow",
  establishedYear: 2007,
  management: "Pvt. Unaided",
  schoolType: "Co-educational",
  category: "Primary with Pre-Primary",
  grades: "Grade 1 to Grade 5",
  gradeSpan: {
    start: 1,
    end: 5,
    hasPrePrimary: true,
    prePrimarySection: "Attached Pre-Primary Section"
  },
  mediumOfInstruction: "English",
  academicSession: "Starts in April",
  schoolArea: "Rural",
  roadApproach: "Approachable by all-weather road",
  buildingType: "Rented building",
  shiftSchool: "Not using school building as a shift-school",
  natureOfSchool: "N/A",

  location: {
    village: "Subbulapuram",
    block: "Sankarankovil Block",
    district: "Tirunelveli District",
    state: "Tamil Nadu",
    country: "India",
    addressSummary: "Subbulapuram, Sankarankovil Block, Tirunelveli District, Tamil Nadu, India",
    landmarkNote: "Located along an all-weather motorable access road in rural Subbulapuram.",
    contactNote: "Contact information will be updated soon."
  },

  statistics: [
    {
      id: "classrooms",
      value: 8,
      label: "Classrooms",
      suffix: "",
      subtext: "For instructional purposes, all in good condition",
      icon: "DoorOpen",
      color: "#0284c7"
    },
    {
      id: "library_books",
      value: 125,
      label: "Library Books",
      suffix: "",
      subtext: "Well-kept reading collection in school library",
      icon: "BookOpen",
      color: "#f59e0b"
    },
    {
      id: "teaching_computers",
      value: 1,
      label: "Teaching Computer",
      suffix: "",
      subtext: "Functional computer for teaching and learning",
      icon: "Monitor",
      color: "#8b5cf6"
    },
    {
      id: "non_teaching_rooms",
      value: 2,
      label: "Non-Teaching Rooms",
      suffix: "",
      subtext: "Dedicated administrative & activity rooms",
      icon: "LayoutGrid",
      color: "#10b981"
    },
    {
      id: "years_of_service",
      value: 19,
      label: "Years of Service",
      suffix: "+",
      subtext: "Nurturing young minds since 2007",
      icon: "Award",
      color: "#ec4899"
    }
  ],

  facilities: [
    {
      id: "classrooms",
      title: "Instructional Classrooms",
      count: "8 Rooms",
      status: "All in Good Condition",
      isAvailable: true,
      description: "8 dedicated, well-ventilated instructional classrooms maintained in good physical condition for Grades 1 through 5.",
      icon: "School",
      badge: "8 Classrooms",
      category: "Academic"
    },
    {
      id: "library",
      title: "School Library",
      count: "125 Books",
      status: "Available & Active",
      isAvailable: true,
      description: "Dedicated library facility housing 125 curated books to foster early childhood reading habits, storytelling, and comprehension.",
      icon: "BookOpen",
      badge: "125 Books",
      category: "Academic"
    },
    {
      id: "computer",
      title: "Computer Learning",
      count: "1 Computer",
      status: "Functional",
      isAvailable: true,
      description: "1 functional computer utilized for interactive teacher demonstrations, multimedia lessons, and basic digital awareness.",
      icon: "Laptop",
      badge: "1 Functional Unit",
      category: "Technology"
    },
    {
      id: "playground",
      title: "School Playground",
      count: "Open Ground",
      status: "Available",
      isAvailable: true,
      description: "Outdoor playground area available for physical education, morning assembly, active sports, and children recreational play.",
      icon: "Activity",
      badge: "Available",
      category: "Recreation"
    },
    {
      id: "drinking_water",
      title: "Drinking Water Facility",
      count: "Tap Water System",
      status: "Functional",
      isAvailable: true,
      description: "Safe, continuous, and functional tap water supply readily accessible for all students and faculty members.",
      icon: "Droplets",
      badge: "Functional Tap Water",
      category: "Hygiene"
    },
    {
      id: "toilets",
      title: "Sanitation & Restrooms",
      count: "2 Units (1 Boys + 1 Girls)",
      status: "Functional",
      isAvailable: true,
      description: "Separate functional toilet facilities for boys (1) and girls (1) maintained with proper hygiene standards.",
      icon: "Users",
      badge: "Separate Boys & Girls",
      category: "Hygiene"
    },
    {
      id: "electricity",
      title: "Electricity Connection",
      count: "Grid Connected",
      status: "Functional",
      isAvailable: true,
      description: "Reliable electrical connection powering classroom fans, illumination, and multimedia computer aids.",
      icon: "Zap",
      badge: "Available",
      category: "Infrastructure"
    },
    {
      id: "head_teacher_room",
      title: "Head Master / Teacher Room",
      count: "1 Separate Room",
      status: "Available",
      isAvailable: true,
      description: "Separate dedicated office room for the Head Master/Teacher to oversee school administration and parent interactions.",
      icon: "UserCheck",
      badge: "Separate Room",
      category: "Administration"
    },
    {
      id: "non_teaching_rooms",
      title: "Non-Teaching Activity Rooms",
      count: "2 Rooms",
      status: "Available",
      isAvailable: true,
      description: "2 separate rooms utilized for staff coordination, educational supplies storage, and developmental activities.",
      icon: "Archive",
      badge: "2 Rooms",
      category: "Administration"
    },
    {
      id: "road_access",
      title: "All-Weather Road Access",
      count: "Direct Approach",
      status: "Accessible",
      isAvailable: true,
      description: "The campus is directly approachable by an all-weather road, ensuring safe commuting during all seasons.",
      icon: "Navigation",
      badge: "All-Weather Access",
      category: "Accessibility"
    }
  ],

  infrastructureDetails: {
    buildingStatus: "Rented Building",
    boundaryWallStatus: "No Boundary Wall",
    calLabStatus: "Not Available",
    midDayMealStatus: "Not Provided",
    rampRequirement: "School does not need a ramp for disabled children to access classrooms"
  },

  academicOverview: {
    sessionStart: "April",
    gradesOffered: "Pre-Primary (LKG/UKG) through Grade 5",
    pedagogy: "Activity-based, child-centric learning aligned with foundational English-medium curriculum.",
    coreSubjects: [
      "English Language & Phonics",
      "Mathematics & Numeracy",
      "Environmental Studies (EVS)",
      "Tamil (Second Language)",
      "General Knowledge & Moral Values",
      "Art, Craft & Physical Fitness"
    ]
  }
};
