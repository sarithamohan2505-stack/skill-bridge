import { Course } from '../types';

export const COURSES_CATALOG: Course[] = [
  // --- Python Programming ---
  {
    id: 'py-fcc-1',
    title: 'Scientific Computing with Python Certification',
    skillCovered: 'Python Programming',
    platform: 'freeCodeCamp',
    description: 'Master Python fundamentals including variables, loops, data structures, algorithm problem-solving, and object-oriented programming with hands-on interactive coding projects.',
    difficulty: 'Beginner',
    duration: '300 Hours (Self-Paced)',
    url: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/',
    isFree: true,
    rating: 4.9
  },
  {
    id: 'py-cs50-2',
    title: 'CS50P: Introduction to Programming with Python',
    skillCovered: 'Python Programming',
    platform: 'Harvard University',
    description: 'An introductory course taught by Prof. David J. Malan that teaches how to read and write code in Python, unit testing, regular expressions, file I/O, and object-oriented design.',
    difficulty: 'Beginner',
    duration: '10 Weeks (3-9 hrs/week)',
    url: 'https://cs50.harvard.edu/python/',
    isFree: true,
    rating: 4.95
  },
  {
    id: 'py-kag-3',
    title: 'Kaggle: Python Micro-Course for Data Science',
    skillCovered: 'Python Programming',
    platform: 'Kaggle Learn',
    description: 'A rapid, hands-on refresher covering syntax, functions, booleans, lists, loops, dictionaries, and external libraries essential for data analysts and developers.',
    difficulty: 'Beginner',
    duration: '5 Hours',
    url: 'https://www.kaggle.com/learn/python',
    isFree: true,
    rating: 4.8
  },

  // --- SQL and Database Management ---
  {
    id: 'sql-fcc-1',
    title: 'Relational Database Certification with PostgreSQL',
    skillCovered: 'SQL and Database Management',
    platform: 'freeCodeCamp',
    description: 'Learn Bash, Git, SQL queries, relational database design, foreign keys, table joins, and database administration inside an interactive Linux terminal container.',
    difficulty: 'Intermediate',
    duration: '300 Hours (Self-Paced)',
    url: 'https://www.freecodecamp.org/learn/relational-database/',
    isFree: true,
    rating: 4.85
  },
  {
    id: 'sql-kag-2',
    title: 'Intro to SQL: Querying Relational Databases',
    skillCovered: 'SQL and Database Management',
    platform: 'Kaggle Learn',
    description: 'Learn SQL scanning BigQuery public datasets. Master SELECT, FROM, WHERE, GROUP BY, HAVING, and ORDER BY with real-world query exercises.',
    difficulty: 'Beginner',
    duration: '3 Hours',
    url: 'https://www.kaggle.com/learn/intro-to-sql',
    isFree: true,
    rating: 4.75
  },
  {
    id: 'sql-cs50-3',
    title: 'CS50S: Introduction to Databases with SQL',
    skillCovered: 'SQL and Database Management',
    platform: 'Harvard University',
    description: 'Comprehensive study of relational databases using SQLite, PostgreSQL, and MySQL. Covers schema normalization, indexes, views, transactions, and security against injection.',
    difficulty: 'Intermediate',
    duration: '7 Weeks (4-8 hrs/week)',
    url: 'https://cs50.harvard.edu/sql/',
    isFree: true,
    rating: 4.9
  },

  // --- Data Analysis ---
  {
    id: 'da-fcc-1',
    title: 'Data Analysis with Python Certification',
    skillCovered: 'Data Analysis',
    platform: 'freeCodeCamp',
    description: 'Read and clean data from various sources using NumPy and Pandas, process missing values, and calculate statistical summaries across complex datasets.',
    difficulty: 'Intermediate',
    duration: '300 Hours (Self-Paced)',
    url: 'https://www.freecodecamp.org/learn/data-analysis-with-python/',
    isFree: true,
    rating: 4.85
  },
  {
    id: 'da-google-2',
    title: 'Google Data Analytics Professional Certificate',
    skillCovered: 'Data Analysis',
    platform: 'Coursera & Google',
    description: 'Industry-standard training covering data cleaning, analysis calculations, spreadsheet modeling, SQL queries, and converting business questions into analytical answers.',
    difficulty: 'Beginner',
    duration: '6 Months (10 hrs/week)',
    url: 'https://www.coursera.org/professional-certificates/google-data-analytics',
    isFree: false,
    rating: 4.8
  },
  {
    id: 'da-mit-3',
    title: 'Introduction to Computational Thinking and Data Science',
    skillCovered: 'Data Analysis',
    platform: 'MIT OpenCourseWare',
    description: 'Focuses on using computation to solve real-world problems. Teaches simulation, random walks, curve fitting, statistical inference, and experimental design.',
    difficulty: 'Advanced',
    duration: '12 Weeks (Self-Paced)',
    url: 'https://ocw.mit.edu/courses/6-0002-introduction-to-computational-thinking-and-data-science-fall-2016/',
    isFree: true,
    rating: 4.95
  },

  // --- Statistics ---
  {
    id: 'stat-khan-1',
    title: 'High School & College Statistics and Probability',
    skillCovered: 'Statistics',
    platform: 'Khan Academy',
    description: 'Learn probability distributions, mean, median, variance, z-scores, hypothesis testing, p-values, regression, and chi-squared tests step-by-step with interactive quizzes.',
    difficulty: 'Beginner',
    duration: '40 Hours (Self-Paced)',
    url: 'https://www.khanacademy.org/math/statistics-probability',
    isFree: true,
    rating: 4.9
  },
  {
    id: 'stat-mit-2',
    title: 'Introduction to Probability and Statistics',
    skillCovered: 'Statistics',
    platform: 'MIT OpenCourseWare',
    description: 'Rigorous mathematical treatment of probability models, Bayes theorem, continuous random variables, central limit theorem, and maximum likelihood estimation.',
    difficulty: 'Intermediate',
    duration: '15 Weeks',
    url: 'https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2014/',
    isFree: true,
    rating: 4.85
  },

  // --- Excel ---
  {
    id: 'excel-ms-1',
    title: 'Microsoft Excel Official Training Video Library',
    skillCovered: 'Excel',
    platform: 'Microsoft Support',
    description: 'Official free video modules covering foundational formulas (VLOOKUP, XLOOKUP, INDEX/MATCH), pivot tables, data validation, conditional formatting, and dashboard charts.',
    difficulty: 'Beginner',
    duration: '15 Hours',
    url: 'https://support.microsoft.com/en-us/office/excel-video-training-9bc05390-e94c-46af-a5b3-d7c22f6990bb',
    isFree: true,
    rating: 4.7
  },
  {
    id: 'excel-fcc-2',
    title: 'Full Excel Course for Data Analysts & Business',
    skillCovered: 'Excel',
    platform: 'freeCodeCamp YouTube',
    description: 'Deep dive into Excel keyboard shortcuts, nested formulas, dynamic arrays, Power Query data transformation, and building executive financial summaries.',
    difficulty: 'Intermediate',
    duration: '4 Hours (Crash Course)',
    url: 'https://www.freecodecamp.org/news/learn-microsoft-excel-full-course/',
    isFree: true,
    rating: 4.8
  },

  // --- Data Visualization ---
  {
    id: 'viz-kag-1',
    title: 'Data Visualization with Seaborn and Matplotlib',
    skillCovered: 'Data Visualization',
    platform: 'Kaggle Learn',
    description: 'Create informative bar charts, heatmaps, scatter plots, line graphs, and distributions to tell compelling visual stories from raw numeric figures.',
    difficulty: 'Beginner',
    duration: '4 Hours',
    url: 'https://www.kaggle.com/learn/data-visualization',
    isFree: true,
    rating: 4.8
  },
  {
    id: 'viz-fcc-2',
    title: 'Data Visualization with D3.js and Chart Frameworks',
    skillCovered: 'Data Visualization',
    platform: 'freeCodeCamp',
    description: 'Build interactive, animated SVG web visualizations, choropleth maps, treemaps, and timeline graphics connected to live APIs.',
    difficulty: 'Intermediate',
    duration: '300 Hours (Self-Paced)',
    url: 'https://www.freecodecamp.org/learn/data-visualization/',
    isFree: true,
    rating: 4.75
  },

  // --- Machine Learning ---
  {
    id: 'ml-deep-1',
    title: 'Machine Learning Specialization by Andrew Ng',
    skillCovered: 'Machine Learning',
    platform: 'Coursera & DeepLearning.AI',
    description: 'The world-renowned foundation course teaching supervised learning (linear regression, logistic regression, decision trees) and unsupervised algorithms (clustering, anomaly detection).',
    difficulty: 'Intermediate',
    duration: '3 Months (9 hrs/week)',
    url: 'https://www.coursera.org/specializations/machine-learning-introduction',
    isFree: false,
    rating: 4.95
  },
  {
    id: 'ml-kag-2',
    title: 'Intro to Machine Learning: Hands-On Scikit-Learn',
    skillCovered: 'Machine Learning',
    platform: 'Kaggle Learn',
    description: 'Build your first predictive models using Decision Trees, Random Forests, cross-validation, and tune hyperparameters to win data science competitions.',
    difficulty: 'Beginner',
    duration: '3 Hours',
    url: 'https://www.kaggle.com/learn/intro-to-machine-learning',
    isFree: true,
    rating: 4.85
  },
  {
    id: 'ml-fcc-3',
    title: 'Machine Learning with Python Certification',
    skillCovered: 'Machine Learning',
    platform: 'freeCodeCamp & TensorFlow',
    description: 'Learn neural network architectures, recurrent neural networks, natural language processing, and computer vision with hands-on guided projects.',
    difficulty: 'Advanced',
    duration: '300 Hours (Self-Paced)',
    url: 'https://www.freecodecamp.org/learn/machine-learning-with-python/',
    isFree: true,
    rating: 4.9
  },

  // --- Communication Skills ---
  {
    id: 'comm-cu-1',
    title: 'Effective Communication: Writing, Design, & Presentation',
    skillCovered: 'Communication Skills',
    platform: 'Coursera & Univ. of Colorado',
    description: 'Master interpersonal clarity, slide deck visual design, technical report writing, active listening, and public speaking techniques for engineering and business teams.',
    difficulty: 'Beginner',
    duration: '4 Weeks (5 hrs/week)',
    url: 'https://www.coursera.org/learn/effective-communication',
    isFree: false,
    rating: 4.75
  },
  {
    id: 'comm-fcc-2',
    title: 'Professional Technical Communication & Interview Skills',
    skillCovered: 'Communication Skills',
    platform: 'freeCodeCamp Career Guide',
    description: 'Learn how to present code architecture, explain technical trade-offs to non-engineers, write clear documentation, and articulate your thoughts in job interviews.',
    difficulty: 'Beginner',
    duration: '10 Hours',
    url: 'https://www.freecodecamp.org/news/how-to-write-technical-documentation/',
    isFree: true,
    rating: 4.8
  }
];
