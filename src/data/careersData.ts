import { CareerRole } from '../types';

export const CAREER_ROLES: CareerRole[] = [
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    category: 'Data & Analytics',
    shortDescription: 'Transforms raw business data into actionable visual insights and metrics for decision-makers.',
    fullDescription: 'Data Analysts inspect, clean, transform, and model data to discover useful information, inform conclusions, and support organizational decision-making across departments like marketing, finance, and operations.',
    averageSalary: '$72,000 - $98,000 / year',
    growthOutlook: '+23% (Much faster than average)',
    requiredSkills: [
      'SQL and Database Management',
      'Data Analysis',
      'Excel',
      'Data Visualization',
      'Statistics',
      'Communication Skills',
    ],
    preferredSkills: [
      'Python Programming',
      'Power BI or Tableau',
      'Critical Thinking',
      'Business Acumen'
    ],
    keyResponsibilities: [
      'Write complex SQL queries to extract data from relational databases',
      'Create interactive dashboards and executive reports in Power BI, Tableau, or Excel',
      'Perform statistical exploratory data analysis to spot business trends',
      'Present findings clearly to non-technical stakeholders'
    ],
    suggestedRoadmap: [
      'Step 1: Master Advanced Excel (Formulas, Pivot Tables, Power Query)',
      'Step 2: Learn Relational Databases & SQL (Joins, Aggregations, Window Functions)',
      'Step 3: Build Dashboards with BI Tools (Tableau / Power BI)',
      'Step 4: Fundamentals of Python for Data Analysis (Pandas, Matplotlib)',
      'Step 5: Business Storytelling and Stakeholder Presentation'
    ]
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    category: 'Data & AI',
    shortDescription: 'Applies statistical modeling, machine learning, and advanced algorithms to predict trends and extract deep knowledge.',
    fullDescription: 'Data Scientists combine programming, domain expertise, and statistical acumen to develop predictive models, uncover patterns in complex datasets, and drive strategic innovations.',
    averageSalary: '$115,000 - $155,000 / year',
    growthOutlook: '+35% (Extremely high demand)',
    requiredSkills: [
      'Python Programming',
      'Statistics',
      'Machine Learning',
      'Data Analysis',
      'SQL and Database Management',
      'Data Visualization',
    ],
    preferredSkills: [
      'Deep Learning',
      'Big Data (PySpark)',
      'Git & Version Control',
      'Linear Algebra & Calculus'
    ],
    keyResponsibilities: [
      'Formulate analytical hypotheses and clean messy, unstructured datasets',
      'Build, tune, and evaluate machine learning regression and classification models',
      'Collaborate with software engineers to deploy models into production pipelines',
      'Quantify model performance and communicate statistical confidence to teams'
    ],
    suggestedRoadmap: [
      'Step 1: Advanced Python (OOP, NumPy, Pandas)',
      'Step 2: Mathematical Foundation (Probability, Hypothesis Testing, Linear Algebra)',
      'Step 3: Applied Machine Learning (Scikit-Learn algorithms)',
      'Step 4: Deep Learning Foundations (Neural Networks)',
      'Step 5: End-to-End Capstone Project Portfolio'
    ]
  },
  {
    id: 'machine-learning-engineer',
    title: 'Machine Learning Engineer',
    category: 'AI & Engineering',
    shortDescription: 'Researches, designs, and builds scalable AI algorithms and deploys production machine learning pipelines.',
    fullDescription: 'Machine Learning Engineers sit at the intersection of software engineering and data science. They are responsible for architecting scalable infrastructure, managing training pipelines, and serving ML models to millions of users in real time.',
    averageSalary: '$125,000 - $170,000 / year',
    growthOutlook: '+40% (Top emerging tech field)',
    requiredSkills: [
      'Python Programming',
      'Machine Learning',
      'Data Analysis',
      'SQL and Database Management',
      'Statistics',
    ],
    preferredSkills: [
      'Docker & Containerization',
      'MLOps Pipelines',
      'PyTorch / TensorFlow',
      'Cloud Fundamentals (AWS/GCP/Azure)'
    ],
    keyResponsibilities: [
      'Develop robust ML pipelines for model training, validation, and automated retraining',
      'Optimize model inference speed, memory footprint, and API latency',
      'Implement MLOps practices, experiment tracking, and model monitoring',
      'Maintain reliable cloud infrastructure for distributed computing'
    ],
    suggestedRoadmap: [
      'Step 1: Solid Software Engineering & Data Structures in Python',
      'Step 2: Core Machine Learning Algorithms & Optimization Techniques',
      'Step 3: Deep Learning Frameworks (PyTorch/TensorFlow)',
      'Step 4: MLOps, Docker, and REST API deployment (FastAPI/Flask)',
      'Step 5: Cloud Deployment & Distributed Scaling'
    ]
  },
  {
    id: 'business-analyst',
    title: 'Business Analyst',
    category: 'Business & Analytics',
    shortDescription: 'Bridges the gap between IT and business objectives using data analytics to assess processes and recommend solutions.',
    fullDescription: 'Business Analysts evaluate business processes, identify operational inefficiencies, articulate requirements for technical teams, and ensure technological solutions align with executive corporate goals.',
    averageSalary: '$78,000 - $105,000 / year',
    growthOutlook: '+14% (Faster than average)',
    requiredSkills: [
      'Excel',
      'Data Analysis',
      'SQL and Database Management',
      'Communication Skills',
      'Data Visualization',
    ],
    preferredSkills: [
      'Agile / Scrum Methodologies',
      'Process Mapping & Wireframing',
      'Requirement Gathering',
      'Tableau / Power BI'
    ],
    keyResponsibilities: [
      'Elicit and document technical and business user requirements',
      'Analyze workflows, cost-benefit trade-offs, and operational bottlenecks',
      'Build KPI trackers and financial models using Excel and SQL',
      'Facilitate sprint planning and act as liaison between developers and executives'
    ],
    suggestedRoadmap: [
      'Step 1: Business Operations & Financial Modeling in Excel',
      'Step 2: SQL Fundamentals for Data Extraction',
      'Step 3: Requirement Documentation (BRD, FRD, User Stories)',
      'Step 4: Agile Scrum Frameworks and Jira/Confluence',
      'Step 5: Executive Communication & Change Management'
    ]
  },
  {
    id: 'python-developer',
    title: 'Python Developer',
    category: 'Software Engineering',
    shortDescription: 'Writes robust backend server logic, REST APIs, automation scripts, and database integrations using Python.',
    fullDescription: 'Python Developers build server-side applications, integrate third-party APIs, create automated web scrapers, and develop scalable backend architectures using frameworks like Flask, Django, and FastAPI.',
    averageSalary: '$85,000 - $120,000 / year',
    growthOutlook: '+25% (High demand across industries)',
    requiredSkills: [
      'Python Programming',
      'SQL and Database Management',
      'Communication Skills',
    ],
    preferredSkills: [
      'Flask / Django Frameworks',
      'RESTful API Design',
      'Git & Version Control',
      'Unit Testing & CI/CD',
      'Data Analysis'
    ],
    keyResponsibilities: [
      'Design, build, and maintain efficient backend web services and microservices',
      'Implement data security, authentication, and database schemas',
      'Write unit and integration tests to ensure software reliability',
      'Automate repetitive data collection and system maintenance workflows'
    ],
    suggestedRoadmap: [
      'Step 1: Python Core (Data Structures, OOP, Error Handling, File I/O)',
      'Step 2: Relational Databases & ORM (SQLite, PostgreSQL, SQLAlchemy)',
      'Step 3: Web Frameworks (Flask or Django) & RESTful APIs',
      'Step 4: Version Control (Git/GitHub) & Testing (PyTest)',
      'Step 5: Docker Containerization & Cloud Deployment'
    ]
  },
  {
    id: 'fullstack-developer',
    title: 'Full Stack Web Developer',
    category: 'Software Engineering',
    shortDescription: 'Architects and builds both client-facing frontend user interfaces and robust backend server systems.',
    fullDescription: 'Full Stack Developers manage the entire web development lifecycle, creating intuitive user interfaces with modern frontend technologies and wiring them with high-performance backend servers and databases.',
    averageSalary: '$88,000 - $130,000 / year',
    growthOutlook: '+26% (Very high demand)',
    requiredSkills: [
      'Python Programming',
      'SQL and Database Management',
      'Communication Skills',
    ],
    preferredSkills: [
      'HTML5, CSS3, Modern JavaScript',
      'React / Frontend Frameworks',
      'Flask / Express Server Architecture',
      'Git & GitHub Collaboration'
    ],
    keyResponsibilities: [
      'Develop responsive, mobile-first web pages and dynamic frontend components',
      'Architect RESTful APIs and database schemas',
      'Coordinate user authentication, session security, and state management',
      'Deploy full-stack applications to cloud platforms and monitor performance'
    ],
    suggestedRoadmap: [
      'Step 1: HTML5, CSS3, Modern JavaScript (ES6+)',
      'Step 2: Frontend Styling (Tailwind / Bootstrap) & React',
      'Step 3: Backend REST APIs (Python Flask / Node Express)',
      'Step 4: Databases (SQLite / PostgreSQL)',
      'Step 5: Full Stack Deployment & CI/CD pipelines'
    ]
  }
];

// All distinct skills available in the platform
export const ALL_SKILLS_CATALOG = [
  { name: 'Python Programming', category: 'Programming & Logic' },
  { name: 'SQL and Database Management', category: 'Databases & Storage' },
  { name: 'Data Analysis', category: 'Analytics & Math' },
  { name: 'Statistics', category: 'Analytics & Math' },
  { name: 'Excel', category: 'Analytics & Tools' },
  { name: 'Data Visualization', category: 'Analytics & Tools' },
  { name: 'Machine Learning', category: 'AI & Data Science' },
  { name: 'Communication Skills', category: 'Professional & Soft Skills' }
];
