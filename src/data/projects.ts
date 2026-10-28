import type { Project } from '../models/Project'

export const projects: Project[] = [
  {
    id: 'carmelink',
    name: 'CarmeLink',
    title: 'Dormitory Management System with Geofencing-Based Curfew Monitoring',
    category: 'Mobile + Web · Dormitory operations',
    kind: 'Collaboration',
    role: 'Frontend Developer / UI/UX Contributor',
    color: '#8ab4f8',
    symbol: 'home',
    tagline: 'Web and mobile dormitory management.',
    overview:
      'A web and mobile dormitory management system connecting tenants, guardians, caretakers, and owners in one shared experience.',
    users: 'Dormitory tenants, guardians, caretakers, and owners.',
    problem:
      'Dormitory operations span rooms, contracts, payments, visitors, and curfew updates. Different roles need different information without getting lost in the process.',
    solution:
      'Role-aware web and mobile interfaces bring everyday dormitory tasks and updates into a clearer, connected workflow.',
    features: [
      'Tenant profiles & room management',
      'Contracts & payment records',
      'Maintenance requests',
      'Visitor management',
      'Geofencing-based curfew monitoring',
      'Notifications & administrative dashboards',
    ],
    stack: ['Flutter', 'Dart', 'Supabase', 'PostgreSQL', 'Firebase Cloud Messaging', 'Geolocation'],
    architecture: [
      'Flutter web & mobile',
      'Supabase services',
      'PostgreSQL data',
      'FCM & location services',
    ],
    workflow: [
      'Choose a role',
      'Access relevant information',
      'Manage a dormitory task',
      'Receive updates',
    ],
    contributions: [
      'Developed web and mobile interfaces.',
      'Improved UI/UX, navigation, and usability.',
      'Adapted responsive layouts for different devices.',
      'Contributed selected supporting features and noncritical backend code.',
    ],
    challenge:
      'The application supports tenants, guardians, and staff across web and mobile. My interface work focuses on role-specific navigation, responsive layouts, and access to the tasks each role needs.',
    outcome:
      'Contributed web and mobile frontend development and UI/UX improvements to a team-built dormitory management system.',
    limitations:
      'Developed collaboratively. Payments, geofencing, and notifications are team-level capabilities. The portfolio demo uses fictional role states and does not connect to those services.',
    github: 'https://github.com/JorjDominic/CarmeLink',
    live: 'https://carmelitasdormitory.site/',
  },
  {
    id: 'promptwise',
    name: 'PromptWise',
    title: 'Adaptive AI Literacy, Ethical Prompting, and Information Verification Application',
    category: 'AI · Education · Mobile + Web',
    kind: 'Personal',
    role: 'Full-Stack Developer',
    color: '#c1b1ef',
    symbol: 'spark',
    tagline: 'AI literacy, prompt coaching, and verification practice.',
    overview:
      'An AI literacy platform helping learners improve prompt-writing skills, understand responsible AI usage, and practice information verification.',
    users: 'Learners building AI literacy and administrators managing learning content.',
    problem:
      'AI literacy requires structured practice in prompt design, responsible use, and source verification.',
    solution:
      'Bring guided practice, information verification, and adaptive learning into a single learning experience.',
    features: [
      'Adaptive Learning & Learning Studio',
      'Prompt Coach & Knowledge Checks',
      'Quick Check & Compare Images',
      'AI Awareness & Prompt Dictionary',
      'Learning Progress',
      'Administrator content management & human-reviewed generated content',
    ],
    stack: [
      'Flutter',
      'Dart',
      'Supabase',
      'PostgreSQL',
      'Supabase Edge Functions',
      'AI integrations',
    ],
    architecture: [
      'Flutter web & mobile',
      'Supabase auth & data',
      'Edge Functions',
      'AI integrations + human review',
    ],
    workflow: ['Explore a concept', 'Practice a prompt', 'Review feedback', 'Reflect & verify'],
    contributions: [
      'Built the full-stack application.',
      'Connected learning interfaces to Supabase and PostgreSQL.',
      'Implemented AI-assisted learning workflows through Edge Functions.',
      'Designed learning progress and administrator content experiences.',
    ],
    challenge:
      'Prompt-coaching and learning-content workflows need clear feedback, consistent presentation, and human review of AI-generated content.',
    outcome:
      'Built the full-stack learning application, including learner interfaces, backend integrations, and content-management workflows.',
    limitations:
      'The interactive demo uses transparent local keyword rules. It does not call a live AI model.',
    github: 'https://github.com/japsTrynHard/PromptWise',
  },
  {
    id: 'autosched-ai',
    name: 'AutoSched AI',
    title: 'AI-Assisted Academic Scheduling Application',
    category: 'AI · Productivity · Mobile',
    kind: 'Personal',
    role: 'Full-Stack Developer',
    color: '#e2be8d',
    symbol: 'calendar',
    tagline: 'Academic scheduling with AI and OCR assistance.',
    overview:
      'A student productivity application for organizing academic schedules, tasks, priorities, and study sessions.',
    users: 'Students managing class schedules, academic tasks, and study time.',
    problem:
      'Turning registration documents into a useful weekly plan involves repetitive entry and keeping track of competing academic priorities.',
    solution:
      'Use OCR-assisted schedule extraction alongside class, task, and priority-based planning tools.',
    features: [
      'Certificate of Registration scanning',
      'OCR-assisted schedule extraction',
      'Class & academic task management',
      'Priority-based planning',
      'Weekly timetable & reminders',
      'Authentication & cloud data management',
    ],
    stack: ['Flutter', 'Dart', 'Firebase', 'Cloud Firestore', 'Google ML Kit', 'Groq'],
    architecture: [
      'Flutter mobile',
      'Google ML Kit OCR',
      'Groq assistance',
      'Firebase & Cloud Firestore',
    ],
    workflow: [
      'Scan a COR',
      'Review extracted classes',
      'Set task priorities',
      'Build a weekly plan',
    ],
    contributions: [
      'Built the full-stack mobile application.',
      'Connected OCR-assisted extraction to scheduling flows.',
      'Implemented class, task, and weekly planning interfaces.',
      'Integrated authentication and cloud data management.',
    ],
    challenge:
      'OCR results need review before creating a timetable. The workflow separates document extraction, class review, and schedule planning.',
    outcome:
      'Built a Flutter application combining COR scanning, class management, academic tasks, and weekly planning with cloud data management.',
    limitations:
      'The repository is private. The interactive demo uses predefined classes instead of processing a real student document.',
  },
  {
    id: 'bayanihan-link',
    name: 'Bayanihan Link',
    title: 'Barangay-Level Community Assistance and Job Finding Platform',
    category: 'Full-Stack Web · Community',
    kind: 'Personal',
    role: 'Full-Stack Developer',
    color: '#a4c9ac',
    symbol: 'community',
    tagline: 'Barangay services, local jobs, and community assistance.',
    overview:
      'A barangay-level community assistance and job finding platform designed for residents of San Miguel, Bulacan.',
    users: 'Residents, local job seekers, people offering assistance, and barangay administrators.',
    problem:
      'Local opportunities and requests for help can get scattered across conversations, making relevant information hard to find.',
    solution:
      'Organize community posts, jobs, assistance reports, and updates around the barangay.',
    features: [
      'Barangay-based community feed',
      'Job opportunities & matching',
      'Emergency assistance reports',
      'Lost-and-found',
      'Messaging & notifications',
      'Barangay administration & authentication',
    ],
    stack: ['React', 'JavaScript', 'Vite', 'Firebase Authentication', 'Cloud Firestore'],
    architecture: [
      'React + Vite client',
      'Firebase Authentication',
      'Cloud Firestore',
      'Community & admin experiences',
    ],
    workflow: [
      'Choose a category',
      'Find a local post',
      'Review the details',
      'Connect with the community',
    ],
    contributions: [
      'Built the full-stack web application.',
      'Designed barangay-based community experiences.',
      'Implemented Firebase authentication and Firestore data flows.',
      'Developed resident and barangay administration interfaces.',
    ],
    challenge:
      'Community posts include different types of requests and opportunities. Category-based discovery helps residents find the information relevant to them.',
    outcome:
      'Built resident and barangay administration interfaces with Firebase Authentication and Cloud Firestore integration.',
    limitations:
      'The repository is private. The demo uses fictional posts and does not publish messages or submit assistance reports.',
    live: 'https://bayanihan-link.vercel.app/',
  },
  {
    id: 'rodelconnect',
    name: 'RodelConnect',
    title: 'Catering Reservation and Management System',
    category: 'Web · E-Commerce · Collaboration',
    kind: 'Collaboration',
    role: 'Frontend Developer / UI/UX Contributor',
    color: '#e6aaa0',
    symbol: 'dining',
    tagline: 'Catering packages, reservations, and operations.',
    overview:
      'A catering reservation website for selecting event packages, configuring bookings, and supporting catering operations.',
    users: 'Event organizers, catering customers, and the catering operations team.',
    problem:
      'Booking an event involves dates, menus, packages, and quotes. Customers need a clear sequence while staff need usable operational information.',
    solution:
      'A guided reservation experience connects package and menu choices with event details and catering operations.',
    features: [
      'Reservation wizard & event scheduling',
      'Package selection & menu customization',
      'Quotes & payment processing',
      'Inventory management',
      'Operational reports',
      'Public assistant implementation',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Supabase', 'PostgreSQL', 'PayMongo'],
    architecture: [
      'React + TypeScript client',
      'Supabase services',
      'PostgreSQL',
      'PayMongo integration',
    ],
    workflow: [
      'Choose a package',
      'Configure your event',
      'Review a quote',
      'Continue reservation',
    ],
    contributions: [
      'Contributed frontend interface development.',
      'Improved UI/UX for customer-facing flows.',
      'Worked on selected supporting implementation tasks.',
      'Collaborated within a broader team-owned system.',
    ],
    challenge:
      'Event bookings involve dependent choices such as package, date, guest count, and menu. My frontend contribution focuses on clear steps, responsive interfaces, and usability.',
    outcome:
      'Contributed React and TypeScript frontend development and UI/UX improvements to a team-built catering reservation system.',
    limitations:
      'Backend reservations and payment processing are team-level capabilities. The portfolio demo produces a sample estimate and does not reserve dates or process payments.',
    github: 'https://github.com/Julian-Dev-Web/rodels-catering',
    live: 'https://www.rodelscatering.online/',
  },
  {
    id: 'map-explorer',
    name: 'Map Explorer PH',
    title: 'A Drag-and-Drop Philippine Geography Learning Game',
    category: 'Educational Game · Mobile',
    kind: 'Collaboration',
    role: 'Frontend / UI/UX Contributor',
    color: '#83c6cb',
    symbol: 'map',
    tagline: 'Philippine geography puzzles and learning activities.',
    overview:
      'An educational game teaching Philippine geography through interactive regional map puzzles and cultural learning.',
    users: 'Learners exploring Philippine geography through play.',
    problem:
      'Memorizing place names can feel disconnected from the places themselves. Interactive practice can make geographic relationships more approachable.',
    solution:
      'Combine regional puzzles with learning facts, quizzes, and visible progression across Luzon, Visayas, and Mindanao.',
    features: [
      'Drag-and-drop regional puzzles',
      'Luzon, Visayas & Mindanao progression',
      'Character selection & regional facts',
      'Quizzes & progress tracking',
      'Achievements',
      'Animation & audio',
    ],
    stack: ['Flutter', 'Dart', 'SharedPreferences', 'Multimedia', 'Text-to-speech'],
    architecture: [
      'Flutter mobile',
      'Puzzle & quiz interactions',
      'SharedPreferences progress',
      'Multimedia & text-to-speech',
    ],
    workflow: ['Choose an island group', 'Place a region', 'Explore a fact', 'Continue learning'],
    contributions: [
      'Contributed frontend interfaces and UI/UX.',
      'Supported educational interaction design.',
      'Contributed selected supporting implementation tasks.',
      'Worked with collaborators on the wider game experience.',
    ],
    challenge:
      'Interactive puzzles need clear instructions, placement targets, and immediate feedback. The portfolio example also supports keyboard and tap input.',
    outcome:
      'Contributed frontend and UI/UX work to a Flutter geography game with regional puzzles and quizzes.',
    limitations:
      'The demo matches regions to island groups using a small sample dataset. It is a simplified interaction rather than the full mobile game.',
    github: 'https://github.com/Julian-Dev-Web/map-explorer',
  },
]
