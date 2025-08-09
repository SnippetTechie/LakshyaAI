export type Challenge = {
  id: string;
  title: string;
  career: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: number; // in minutes
  points: number;
  description: string;
  skills: string[];
  completed?: boolean;
  completedAt?: Date;
  score?: number;
};

export const getChallengeById = (id: string): Challenge | undefined => {
  return challenges.find(challenge => challenge.id === id);
};

export const challenges: Challenge[] = [
  // Software Development & Technology
  {
    id: '1',
    title: 'Build a Simple Calculator',
    career: 'Software Developer',
    difficulty: 'Easy',
    duration: 15,
    points: 100,
    description: "Experience what it's like to code by building a functional calculator with HTML, CSS, and JavaScript.",
    skills: ['Problem Solving', 'Logic', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    id: '2',
    title: 'Design a Mobile App Interface',
    career: 'UI/UX Designer',
    difficulty: 'Easy',
    duration: 20,
    points: 120,
    description: "Create an intuitive mobile app interface for a food delivery service using design principles.",
    skills: ['Design Thinking', 'User Experience', 'Visual Design', 'Prototyping'],
  },
  {
    id: '3',
    title: 'Secure a Network System',
    career: 'Cybersecurity Analyst',
    difficulty: 'Hard',
    duration: 30,
    points: 200,
    description: "Identify security vulnerabilities and implement protection measures for a company network.",
    skills: ['Security Analysis', 'Risk Assessment', 'Network Security', 'Problem Solving'],
  },

  // Healthcare & Medical
  {
    id: '4',
    title: 'Diagnose Patient Symptoms',
    career: 'Medical Doctor',
    difficulty: 'Medium',
    duration: 20,
    points: 150,
    description: "Step into a doctor's shoes and diagnose patients based on their symptoms and medical history.",
    skills: ['Critical Thinking', 'Pattern Recognition', 'Medical Knowledge'],
  },
  {
    id: '5',
    title: 'Plan a Rehabilitation Program',
    career: 'Physiotherapist',
    difficulty: 'Medium',
    duration: 25,
    points: 160,
    description: "Design a personalized rehabilitation program for a patient recovering from knee surgery.",
    skills: ['Assessment', 'Treatment Planning', 'Anatomy Knowledge', 'Patient Care'],
  },
  {
    id: '6',
    title: 'Analyze Lab Results',
    career: 'Medical Lab Technician',
    difficulty: 'Easy',
    duration: 15,
    points: 110,
    description: "Examine blood samples and identify abnormal values that could indicate health conditions.",
    skills: ['Attention to Detail', 'Scientific Analysis', 'Laboratory Skills', 'Data Interpretation'],
  },

  // Business & Finance
  {
    id: '7',
    title: 'Create a Marketing Campaign',
    career: 'Marketing Manager',
    difficulty: 'Medium',
    duration: 30,
    points: 180,
    description: "Develop a comprehensive marketing strategy for launching a new eco-friendly product.",
    skills: ['Strategic Thinking', 'Creativity', 'Market Research', 'Communication'],
  },
  {
    id: '8',
    title: 'Analyze Investment Portfolio',
    career: 'Financial Analyst',
    difficulty: 'Hard',
    duration: 35,
    points: 220,
    description: "Evaluate investment opportunities and create recommendations for a client's portfolio.",
    skills: ['Financial Analysis', 'Risk Assessment', 'Market Knowledge', 'Decision Making'],
  },
  {
    id: '9',
    title: 'Negotiate a Business Deal',
    career: 'Sales Manager',
    difficulty: 'Medium',
    duration: 20,
    points: 140,
    description: "Navigate a complex sales negotiation with a potential corporate client.",
    skills: ['Negotiation', 'Communication', 'Relationship Building', 'Strategic Thinking'],
  },

  // Data Science & Analytics
  {
    id: '10',
    title: 'Predict Sales Trends',
    career: 'Data Scientist',
    difficulty: 'Medium',
    duration: 25,
    points: 175,
    description: 'Analyze sales data and create predictions using basic data science techniques and visualization.',
    skills: ['Analytical Thinking', 'Statistics', 'Data Visualization'],
  },
  {
    id: '11',
    title: 'Build a Recommendation System',
    career: 'Machine Learning Engineer',
    difficulty: 'Hard',
    duration: 40,
    points: 250,
    description: "Create an AI system that recommends products to customers based on their preferences.",
    skills: ['Machine Learning', 'Programming', 'Algorithm Design', 'Data Processing'],
  },

  // Education & Teaching
  {
    id: '12',
    title: 'Plan an Interactive Lesson',
    career: 'School Teacher',
    difficulty: 'Easy',
    duration: 20,
    points: 130,
    description: "Design an engaging science lesson about photosynthesis for 8th-grade students.",
    skills: ['Lesson Planning', 'Communication', 'Creativity', 'Student Engagement'],
  },
  {
    id: '13',
    title: 'Counsel a Struggling Student',
    career: 'School Counselor',
    difficulty: 'Medium',
    duration: 25,
    points: 155,
    description: "Help a student overcome academic challenges and develop a success plan.",
    skills: ['Active Listening', 'Problem Solving', 'Empathy', 'Guidance'],
  },

  // Creative Arts & Media
  {
    id: '14',
    title: 'Design a Brand Identity',
    career: 'Graphic Designer',
    difficulty: 'Medium',
    duration: 30,
    points: 170,
    description: "Create a complete brand identity including logo, colors, and typography for a startup.",
    skills: ['Visual Design', 'Creativity', 'Brand Strategy', 'Typography'],
  },
  {
    id: '15',
    title: 'Write a News Article',
    career: 'Journalist',
    difficulty: 'Easy',
    duration: 25,
    points: 135,
    description: "Research and write a compelling news article about local environmental initiatives.",
    skills: ['Research', 'Writing', 'Interviewing', 'Fact-Checking'],
  },
  {
    id: '16',
    title: 'Plan a Photo Shoot',
    career: 'Photographer',
    difficulty: 'Easy',
    duration: 20,
    points: 125,
    description: "Organize a professional portrait session including lighting, composition, and styling.",
    skills: ['Visual Composition', 'Lighting', 'Planning', 'Client Communication'],
  },

  // Engineering & Architecture
  {
    id: '17',
    title: 'Design a Sustainable Building',
    career: 'Architect',
    difficulty: 'Hard',
    duration: 45,
    points: 280,
    description: "Create architectural plans for an eco-friendly office building with energy-efficient features.",
    skills: ['Design Thinking', 'Sustainability', 'Technical Drawing', 'Problem Solving'],
  },
  {
    id: '18',
    title: 'Optimize a Manufacturing Process',
    career: 'Industrial Engineer',
    difficulty: 'Medium',
    duration: 30,
    points: 185,
    description: "Improve efficiency and reduce waste in a factory production line.",
    skills: ['Process Optimization', 'Systems Thinking', 'Data Analysis', 'Quality Control'],
  },

  // Legal & Government
  {
    id: '19',
    title: 'Prepare a Legal Case',
    career: 'Lawyer',
    difficulty: 'Hard',
    duration: 40,
    points: 240,
    description: "Research laws and build arguments for a civil rights case.",
    skills: ['Legal Research', 'Critical Analysis', 'Argumentation', 'Case Preparation'],
  },
  {
    id: '20',
    title: 'Draft a Policy Proposal',
    career: 'Policy Analyst',
    difficulty: 'Medium',
    duration: 35,
    points: 195,
    description: "Create a comprehensive policy proposal to address urban transportation challenges.",
    skills: ['Policy Analysis', 'Research', 'Writing', 'Systems Thinking'],
  },

  // Science & Research
  {
    id: '21',
    title: 'Conduct a Chemistry Experiment',
    career: 'Research Scientist',
    difficulty: 'Medium',
    duration: 30,
    points: 175,
    description: "Design and execute an experiment to test the effectiveness of natural preservatives.",
    skills: ['Scientific Method', 'Experimentation', 'Data Analysis', 'Critical Thinking'],
  },
  {
    id: '22',
    title: 'Analyze Climate Data',
    career: 'Environmental Scientist',
    difficulty: 'Medium',
    duration: 25,
    points: 165,
    description: "Study weather patterns and assess the impact of climate change on local ecosystems.",
    skills: ['Data Analysis', 'Environmental Knowledge', 'Research', 'Report Writing'],
  },

  // Social Work & Psychology
  {
    id: '23',
    title: 'Develop a Therapy Plan',
    career: 'Psychologist',
    difficulty: 'Hard',
    duration: 35,
    points: 210,
    description: "Create a treatment plan for a client dealing with anxiety and depression.",
    skills: ['Assessment', 'Treatment Planning', 'Empathy', 'Communication'],
  },
  {
    id: '24',
    title: 'Organize Community Support',
    career: 'Social Worker',
    difficulty: 'Medium',
    duration: 25,
    points: 150,
    description: "Coordinate resources and support for families affected by natural disasters.",
    skills: ['Case Management', 'Resource Coordination', 'Communication', 'Problem Solving'],
  }
];
