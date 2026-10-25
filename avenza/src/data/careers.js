// ------------------------------------------------------------------
// Career data
// Each career has the fields used by the recommendation engine and
// the dynamic career detail page (/career/:careerSlug).
// ------------------------------------------------------------------

export const careers = [
  {
    id: "software-engineer",
    slug: "software-engineer",
    title: "Software Engineer",
    category: "Technology",
    description: "Design, develop, and maintain software applications and systems. Software engineers solve complex computational problems and build scalable solutions.",
    interests: ["Coding", "Technology", "Problem Solving", "Mathematics"],
    requiredSkills: ["Programming", "Problem Solving", "Analytical Thinking", "Teamwork"],
    recommendedStreams: ["PCM", "Other"],
    minimumMarks: 70,
    budgetLevel: ["Low", "Medium", "High"],
    salary: "₹8L - ₹25L+",
    growth: "High",
    difficulty: "Medium",
    futureOutlook: "Extremely high globally, expanding into cloud, edge computing, and distributed systems.",
    roadmap: [
      { stage: "Foundation", duration: "10th - 12th", detail: "Study PCM with a focus on mathematics and computer science." },
      { stage: "Degree", duration: "4 years", detail: "B.Tech/B.E. in Computer Science with strong DSA fundamentals." },
      { stage: "Specialize", duration: "1 year", detail: "Pick a domain - web, mobile, cloud, or systems." },
      { stage: "Career", duration: "Ongoing", detail: "Build a portfolio, contribute to open source, and keep learning." }
    ]
  },
  {
    id: "ai-engineer",
    slug: "ai-engineer",
    title: "AI Engineer",
    category: "Technology",
    description: "Build logic, implement machine learning algorithms, and develop intelligent systems that can learn and adapt over time.",
    interests: ["Artificial Intelligence", "Coding", "Mathematics", "Data Analysis", "Technology"],
    requiredSkills: ["Programming", "Mathematics", "Analytical Thinking", "Research", "Problem Solving"],
    recommendedStreams: ["PCM"],
    minimumMarks: 75,
    budgetLevel: ["Medium", "High"],
    salary: "₹12L - ₹40L+",
    growth: "Very High",
    difficulty: "High",
    futureOutlook: "Explosive growth predicted across all sectors, from healthcare to finance.",
    roadmap: [
      { stage: "Foundation", duration: "10th - 12th", detail: "Master PCM with strong mathematics (linear algebra, calculus)." },
      { stage: "Degree", duration: "4 years", detail: "B.Tech in CSE/AI with a focus on ML and statistics." },
      { stage: "Specialize", duration: "1-2 years", detail: "Learn deep learning, NLP, or computer vision in depth." },
      { stage: "Career", duration: "Ongoing", detail: "Work on real datasets, publish, and join an AI team." }
    ]
  },
  {
    id: "data-scientist",
    slug: "data-scientist",
    title: "Data Scientist",
    category: "Technology",
    description: "Analyze and interpret complex digital data to help companies make better, more informed business decisions.",
    interests: ["Data Analysis", "Mathematics", "Technology", "Business", "Coding"],
    requiredSkills: ["Mathematics", "Analytical Thinking", "Programming", "Problem Solving"],
    recommendedStreams: ["PCM", "Commerce"],
    minimumMarks: 70,
    budgetLevel: ["Low", "Medium", "High"],
    salary: "₹10L - ₹30L+",
    growth: "Very High",
    difficulty: "High",
    futureOutlook: "Crucial role moving forward as businesses heavily rely on data-driven decisions.",
    roadmap: [
      { stage: "Foundation", duration: "10th - 12th", detail: "Build strong statistics and maths foundations." },
      { stage: "Degree", duration: "4 years", detail: "Mathematics, Statistics or CSE with data electives." },
      { stage: "Specialize", duration: "1 year", detail: "SQL, Python, and visualisation tools like Power BI." },
      { stage: "Career", duration: "Ongoing", detail: "Solve real business problems with data." }
    ]
  },
  {
    id: "cyber-security-analyst",
    slug: "cyber-security-analyst",
    title: "Cyber Security Analyst",
    category: "Technology",
    description: "Protect organizational data and networks from cyber threats, ensuring system integrity and monitoring security events.",
    interests: ["Cyber Security", "Technology", "Coding", "Problem Solving"],
    requiredSkills: ["Analytical Thinking", "Problem Solving", "Programming", "Communication"],
    recommendedStreams: ["PCM", "Other"],
    minimumMarks: 65,
    budgetLevel: ["Medium", "High"],
    salary: "₹6L - ₹20L+",
    growth: "High",
    difficulty: "High",
    futureOutlook: "Critical demand due to increasing frequency of global cyber attacks.",
    roadmap: [
      { stage: "Foundation", duration: "10th - 12th", detail: "Study PCM and learn the basics of networks." },
      { stage: "Degree", duration: "4 years", detail: "B.Tech in CSE or Cyber Security specialization." },
      { stage: "Certify", duration: "1-2 years", detail: "CEH, CompTIA Security+, and practical labs." },
      { stage: "Career", duration: "Ongoing", detail: "Join a SOC team or security consultancy." }
    ]
  },
  {
    id: "doctor",
    slug: "doctor",
    title: "Doctor",
    category: "Medical",
    description: "Diagnose, treat, and prevent illnesses and injuries. Doctors play an essential role in society's health and wellness.",
    interests: ["Medicine", "Biology", "Problem Solving", "Research"],
    requiredSkills: ["Communication", "Problem Solving", "Analytical Thinking", "Teamwork"],
    recommendedStreams: ["PCB"],
    minimumMarks: 85,
    budgetLevel: ["High"],
    salary: "₹10L - ₹30L+",
    growth: "Steady",
    difficulty: "Very High",
    futureOutlook: "Evergreen demand globally, with constant advancements in medical science.",
    roadmap: [
      { stage: "Foundation", duration: "10th - 12th", detail: "Study PCB and prepare for NEET." },
      { stage: "Degree", duration: "5.5 years", detail: "MBBS, followed by internship." },
      { stage: "Specialize", duration: "3 years", detail: "MD/MS in a preferred specialization." },
      { stage: "Career", duration: "Ongoing", detail: "Practice, research, or super-specialize further." }
    ]
  },
  {
    id: "lawyer",
    slug: "lawyer",
    title: "Lawyer",
    category: "Government Services",
    description: "Advise and represent individuals, businesses, and government agencies on legal issues and disputes.",
    interests: ["Law", "Government Services", "Business", "Communication"],
    requiredSkills: ["Communication", "Analytical Thinking", "Research", "Problem Solving", "Leadership"],
    recommendedStreams: ["Arts", "Commerce", "PCM", "PCB"],
    minimumMarks: 60,
    budgetLevel: ["Medium", "High"],
    salary: "₹5L - ₹50L+",
    growth: "Steady",
    difficulty: "High",
    futureOutlook: "High demand in corporate, intellectual property, and cyber law.",
    roadmap: [
      { stage: "Foundation", duration: "10th - 12th", detail: "Strong reading and current-affairs habits." },
      { stage: "Degree", duration: "5 years", detail: "BA LLB or BBA LLB integrated programme." },
      { stage: "Specialize", duration: "1-2 years", detail: "Corporate, criminal, or constitutional law practice." },
      { stage: "Career", duration: "Ongoing", detail: "Practice in courts or join a law firm." }
    ]
  },
  {
    id: "ui-ux-designer",
    slug: "ui-ux-designer",
    title: "UI/UX Designer",
    category: "Creative",
    description: "Design intuitive and aesthetically pleasing digital interfaces, focusing on optimizing the user experience.",
    interests: ["Design", "Creative Arts", "Technology", "Problem Solving"],
    requiredSkills: ["Creativity", "Communication", "Problem Solving", "Teamwork"],
    recommendedStreams: ["Arts", "Commerce", "PCM", "PCB", "Other"],
    minimumMarks: 50,
    budgetLevel: ["Low", "Medium"],
    salary: "₹6L - ₹20L+",
    growth: "High",
    difficulty: "Medium",
    futureOutlook: "Essential as user-centric products continue to dominate the tech market.",
    roadmap: [
      { stage: "Foundation", duration: "9th - 12th", detail: "Learn design basics, Figma, and visual composition." },
      { stage: "Course", duration: "6 months - 1 year", detail: "UI/UX bootcamp or design certification." },
      { stage: "Portfolio", duration: "1 year", detail: "Build 3-4 strong case studies on real problems." },
      { stage: "Career", duration: "Ongoing", detail: "Join product teams or freelance." }
    ]
  },
  {
    id: "game-developer",
    slug: "game-developer",
    title: "Game Developer",
    category: "Creative",
    description: "Create video games, combining programming expertise with creative design. Work on mechanics, graphics, and gameplay logic.",
    interests: ["Gaming", "Coding", "Creative Arts", "Technology", "Design"],
    requiredSkills: ["Programming", "Creativity", "Problem Solving", "Teamwork"],
    recommendedStreams: ["PCM", "Other"],
    minimumMarks: 60,
    budgetLevel: ["Medium", "High"],
    salary: "₹5L - ₹25L+",
    growth: "High",
    difficulty: "High",
    futureOutlook: "Rapidly growing industry intersecting with AR, VR, and Metaverses.",
    roadmap: [
      { stage: "Foundation", duration: "10th - 12th", detail: "Learn logic, math, and start with engines like Unity." },
      { stage: "Degree", duration: "4 years", detail: "CSE or dedicated game development programme." },
      { stage: "Portfolio", duration: "1-2 years", detail: "Ship small games and join game jams." },
      { stage: "Career", duration: "Ongoing", detail: "Join a studio or build indie games." }
    ]
  },
  {
    id: "chartered-accountant",
    slug: "chartered-accountant",
    title: "Chartered Accountant",
    category: "Business",
    description: "Work in accounting, taxation, auditing, and financial management for businesses and individuals.",
    interests: ["Finance", "Business", "Mathematics", "Law"],
    requiredSkills: ["Analytical Thinking", "Mathematics", "Problem Solving", "Communication"],
    recommendedStreams: ["Commerce", "PCM"],
    minimumMarks: 75,
    budgetLevel: ["Low", "Medium"],
    salary: "₹8L - ₹25L+",
    growth: "Steady",
    difficulty: "Very High",
    futureOutlook: "Crucial role in the corporate economy, expanding into strategic advisory.",
    roadmap: [
      { stage: "Foundation", duration: "11th - 12th", detail: "Take Commerce with strong accounts and maths." },
      { stage: "Foundation Course", duration: "6-8 months", detail: "Register with ICAI after Class 10/12." },
      { stage: "Intermediate", duration: "2 years", detail: "Clear CA Intermediate while pursuing graduation." },
      { stage: "Final", duration: "2-3 years", detail: "Articleship + CA Final to become a member." }
    ]
  },
  {
    id: "ias-officer",
    slug: "ias-officer",
    title: "IAS Officer",
    category: "Government",
    description: "Serve in the premier civil service of India. Responsible for managing government administration and policy implementation.",
    interests: ["Government Services", "Law", "Business", "Management"],
    requiredSkills: ["Leadership", "Communication", "Problem Solving", "Analytical Thinking"],
    recommendedStreams: ["Arts", "PCM", "PCB", "Commerce"],
    minimumMarks: 60,
    budgetLevel: ["Low", "Medium"],
    salary: "₹7L - ₹25L+ (Plus Perks)",
    growth: "Steady",
    difficulty: "Extremely High",
    futureOutlook: "Highest level of administrative governance, permanent prestige.",
    roadmap: [
      { stage: "Foundation", duration: "10th - 12th", detail: "Build a strong base in history, polity, and current affairs." },
      { stage: "Degree", duration: "3 years", detail: "Any graduation degree (prefer humanities for depth)." },
      { stage: "Preparation", duration: "1-2 years", detail: "UPSC-CSE prelims + mains preparation." },
      { stage: "Career", duration: "Ongoing", detail: "Interview and training at LBSNAA." }
    ]
  },
  {
    id: "business-analyst",
    slug: "business-analyst",
    title: "Business Analyst",
    category: "Business",
    description: "Bridge the gap between IT and business using data analytics to assess processes, determine requirements, and deliver data-driven recommendations and reports.",
    interests: ["Business", "Data Analysis", "Technology", "Finance", "Communication"],
    requiredSkills: ["Analytical Thinking", "Communication", "Problem Solving", "Teamwork"],
    recommendedStreams: ["Commerce", "PCM", "Other"],
    minimumMarks: 65,
    budgetLevel: ["Low", "Medium", "High"],
    salary: "₹7L - ₹22L+",
    growth: "High",
    difficulty: "Medium",
    futureOutlook: "Widely applicable across all modern enterprises looking for efficiency.",
    roadmap: [
      { stage: "Foundation", duration: "10th - 12th", detail: "Study Commerce/Mathematics with business exposure." },
      { stage: "Degree", duration: "3-4 years", detail: "BBA, B.Com, or B.Tech with management electives." },
      { stage: "Skill up", duration: "6-12 months", detail: "Excel, SQL, and process-modelling tools." },
      { stage: "Career", duration: "Ongoing", detail: "Start as analyst and grow into product or strategy." }
    ]
  },
  {
    id: "research-scientist",
    slug: "research-scientist",
    title: "Research Scientist",
    category: "Research",
    description: "Conduct laboratory-based experiments and trials. Perform high-level research to advance scientific knowledge or develop commercial products.",
    interests: ["Biology", "Mathematics", "Technology", "Research", "Medicine"],
    requiredSkills: ["Research", "Analytical Thinking", "Problem Solving", "Communication", "Creativity"],
    recommendedStreams: ["PCM", "PCB"],
    minimumMarks: 80,
    budgetLevel: ["Medium", "High"],
    salary: "₹6L - ₹25L+",
    growth: "Steady",
    difficulty: "High",
    futureOutlook: "Fundamental to advancement in medical, environmental, and technological branches.",
    roadmap: [
      { stage: "Foundation", duration: "10th - 12th", detail: "Study PCM/PCB with science olympiads." },
      { stage: "Degree", duration: "3-4 years", detail: "B.Sc/B.Tech with a research orientation." },
      { stage: "Research", duration: "2-3 years", detail: "Masters + PhD / research fellowship." },
      { stage: "Career", duration: "Ongoing", detail: "Work in labs, academia, or R&D organizations." }
    ]
  },
  {
    id: "pharmacist",
    slug: "pharmacist",
    title: "Pharmacist",
    category: "Medical",
    description: "Dispense medications, advise on safe drug use, and contribute to patient care through pharmaceutical and clinical expertise.",
    interests: ["Biology", "Medicine", "Mathematics"],
    requiredSkills: ["Communication", "Problem Solving", "Analytical Thinking", "Teamwork"],
    recommendedStreams: ["PCB", "PCM"],
    minimumMarks: 70,
    budgetLevel: ["Medium", "High"],
    salary: "₹5L - ₹15L+",
    growth: "Steady",
    difficulty: "High",
    futureOutlook: "Consistent demand across hospital, retail, and pharma R&D settings.",
    roadmap: [
      { stage: "Foundation", duration: "11th - 12th", detail: "Study PCB with a strong chemistry base." },
      { stage: "Degree", duration: "4 years", detail: "B.Pharm with practical internships." },
      { stage: "Register", duration: "1 year", detail: "Licensing with the Pharmacy Council + internship." },
      { stage: "Career", duration: "Ongoing", detail: "Hospital, retail, regulatory, or pharma R&D roles." }
    ]
  },
  {
    id: "biotechnologist",
    slug: "biotechnologist",
    title: "Biotechnologist",
    category: "Medical",
    description: "Apply biology, genetics, and lab techniques to develop products and solutions in healthcare, agriculture, and industry.",
    interests: ["Biology", "Medicine", "Mathematics", "Problem Solving"],
    requiredSkills: ["Research", "Analytical Thinking", "Problem Solving", "Creativity"],
    recommendedStreams: ["PCB", "PCM"],
    minimumMarks: 70,
    budgetLevel: ["Medium", "High"],
    salary: "₹4L - ₹20L+",
    growth: "High",
    difficulty: "High",
    futureOutlook: "Growing quickly with genomics, bioinformatics, and biopharma.",
    roadmap: [
      { stage: "Foundation", duration: "11th - 12th", detail: "Study PCB with biology and biotechnology focus." },
      { stage: "Degree", duration: "3-4 years", detail: "B.Sc Bio / B.Tech Biotechnology." },
      { stage: "Specialize", duration: "1-2 years", detail: "M.Sc/M.Tech in genetics, bioinformatics, or bioprocessing." },
      { stage: "Career", duration: "Ongoing", detail: "Biopharma R&D, agritech, or biomedical labs." }
    ]
  }
];

// Helper to look up a single career by slug (used on the dynamic route page).
export const getCareerBySlug = (slug) =>
  careers.find((career) => career.slug === slug);