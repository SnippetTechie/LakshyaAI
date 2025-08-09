export interface VideoResource {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: string;
  channel: string;
  url: string;
  publishedAt: string;
}

export interface DocumentResource {
  id: string;
  title: string;
  description: string;
  type: 'PDF' | 'Guide' | 'Documentation' | 'Course' | 'Article';
  pages?: number;
  url: string;
  source: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface CareerResourceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  videos: VideoResource[];
  documents: DocumentResource[];
}

// 2025 Career Resources with YouTube videos and documentation
export const careerResources: CareerResourceCategory[] = [
  {
    id: 'software-engineering',
    name: 'Software Engineering',
    description: 'Programming, development, and tech career resources',
    icon: '💻',
    videos: [
      {
        id: 'se-1',
        title: 'Complete Software Engineer Roadmap 2025',
        description: 'Everything you need to know to become a software engineer in 2025',
        thumbnail: 'https://img.youtube.com/vi/WXuK6gekU1Y/hqdefault.jpg',
        duration: '45:32',
        views: '2.1M',
        channel: 'Tech With Tim',
        url: 'https://www.youtube.com/watch?v=WXuK6gekU1Y',
        publishedAt: '2024-12-15'
      },
      {
        id: 'se-2',
        title: 'Full Stack Developer Roadmap 2025',
        description: 'Complete guide to becoming a full stack developer with modern technologies',
        thumbnail: 'https://img.youtube.com/vi/nu_pCVPKzTk/hqdefault.jpg',
        duration: '38:45',
        views: '1.8M',
        channel: 'Traversy Media',
        url: 'https://www.youtube.com/watch?v=nu_pCVPKzTk',
        publishedAt: '2024-11-20'
      },
      {
        id: 'se-3',
        title: 'AI/ML Engineer Career Path 2025',
        description: 'How to become an AI/ML engineer with practical projects and skills',
        thumbnail: 'https://img.youtube.com/vi/aircAruvnKk/hqdefault.jpg',
        duration: '52:18',
        views: '3.2M',
        channel: '3Blue1Brown',
        url: 'https://www.youtube.com/watch?v=aircAruvnKk',
        publishedAt: '2024-10-30'
      },
      {
        id: 'se-4',
        title: 'Data Science Career Guide 2025',
        description: 'Complete roadmap for data science career with Python and R',
        thumbnail: 'https://img.youtube.com/vi/ua-CiDNNj30/hqdefault.jpg',
        duration: '41:22',
        views: '1.5M',
        channel: 'CodeWithHarry',
        url: 'https://www.youtube.com/watch?v=ua-CiDNNj30',
        publishedAt: '2024-12-01'
      }
    ],
    documents: [
      {
        id: 'se-doc-1',
        title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
        description: 'Essential guide for writing maintainable and clean code',
        type: 'PDF',
        pages: 464,
        url: 'https://github.com/ontiyonke/book-1/blob/master/%5BPROGRAMMING%5D%5BClean%20Code%20by%20Robert%20C%20Martin%5D.pdf',
        source: 'Robert C. Martin',
        difficulty: 'Intermediate'
      },
      {
        id: 'se-doc-2',
        title: 'System Design Interview Guide',
        description: 'Comprehensive guide for system design interviews at top tech companies',
        type: 'Guide',
        url: 'https://github.com/donnemartin/system-design-primer',
        source: 'GitHub',
        difficulty: 'Advanced'
      },
      {
        id: 'se-doc-3',
        title: 'JavaScript: The Definitive Guide',
        description: 'Complete reference for modern JavaScript development',
        type: 'Documentation',
        pages: 1096,
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
        source: 'MDN Web Docs',
        difficulty: 'Beginner'
      },
      {
        id: 'se-doc-4',
        title: 'Machine Learning Yearning',
        description: 'Technical strategy guide for AI engineers by Andrew Ng',
        type: 'PDF',
        pages: 118,
        url: 'https://github.com/ajaymache/machine-learning-yearning',
        source: 'Andrew Ng',
        difficulty: 'Intermediate'
      }
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Medicine',
    description: 'Medical careers, nursing, and healthcare administration',
    icon: '🏥',
    videos: [
      {
        id: 'hc-1',
        title: 'Medical School Journey 2025 - Complete Guide',
        description: 'Everything about getting into medical school and becoming a doctor',
        thumbnail: 'https://img.youtube.com/vi/lVKHl_lauD4/hqdefault.jpg',
        duration: '35:42',
        views: '892K',
        channel: 'Med School Insiders',
        url: 'https://www.youtube.com/watch?v=lVKHl_lauD4',
        publishedAt: '2024-11-15'
      },
      {
        id: 'hc-2',
        title: 'Nursing Career Paths 2025',
        description: 'Different nursing specializations and career opportunities',
        thumbnail: 'https://img.youtube.com/vi/tZwXJaKHW8s/hqdefault.jpg',
        duration: '28:15',
        views: '654K',
        channel: 'Nurse Blake',
        url: 'https://www.youtube.com/watch?v=tZwXJaKHW8s',
        publishedAt: '2024-12-05'
      },
      {
        id: 'hc-3',
        title: 'Healthcare Administration Career Guide',
        description: 'Business side of healthcare - administration and management roles',
        thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/hqdefault.jpg',
        duration: '32:08',
        views: '423K',
        channel: 'Healthcare Management',
        url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
        publishedAt: '2024-10-20'
      },
      {
        id: 'hc-4',
        title: 'Physical Therapy Career Overview 2025',
        description: 'How to become a physical therapist and career prospects',
        thumbnail: 'https://img.youtube.com/vi/Yx6bJGI5w7w/maxresdefault.jpg',
        duration: '26:33',
        views: '387K',
        channel: 'PT Student Guide',
        url: 'https://www.youtube.com/watch?v=Yx6bJGI5w7w',
        publishedAt: '2024-11-28'
      }
    ],
    documents: [
      {
        id: 'hc-doc-1',
        title: 'NEET 2025 Preparation Guide',
        description: 'Complete strategy guide for NEET entrance exam preparation',
        type: 'Guide',
        pages: 156,
        url: 'https://neet.nta.nic.in/WebInfo/File/GetFile?FileId=12&LangId=P',
        source: 'NTA Official',
        difficulty: 'Intermediate'
      },
      {
        id: 'hc-doc-2',
        title: 'Medical Ethics and Patient Care',
        description: 'Essential guide to medical ethics and patient care principles',
        type: 'PDF',
        pages: 324,
        url: 'https://www.who.int/publications/i/item/9789241506908',
        source: 'WHO',
        difficulty: 'Advanced'
      },
      {
        id: 'hc-doc-3',
        title: 'Nursing Fundamentals Textbook',
        description: 'Comprehensive nursing fundamentals and clinical skills',
        type: 'Course',
        url: 'https://www.khanacademy.org/science/health-and-medicine',
        source: 'Khan Academy',
        difficulty: 'Beginner'
      },
      {
        id: 'hc-doc-4',
        title: 'Healthcare Quality Management',
        description: 'Guide to quality improvement in healthcare settings',
        type: 'Documentation',
        pages: 245,
        url: 'https://www.ahrq.gov/professionals/quality-patient-safety/index.html',
        source: 'AHRQ',
        difficulty: 'Intermediate'
      }
    ]
  },
  {
    id: 'business',
    name: 'Business & Management',
    description: 'Entrepreneurship, marketing, finance, and business strategy',
    icon: '💼',
    videos: [
      {
        id: 'bs-1',
        title: 'Business Strategy Masterclass 2025',
        description: 'Complete guide to business strategy and entrepreneurship',
        thumbnail: 'https://img.youtube.com/vi/wvWpdrfoEv0/maxresdefault.jpg',
        duration: '48:25',
        views: '1.3M',
        channel: 'Harvard Business Review',
        url: 'https://www.youtube.com/watch?v=wvWpdrfoEv0',
        publishedAt: '2024-12-10'
      },
      {
        id: 'bs-2',
        title: 'Digital Marketing Career Path 2025',
        description: 'How to start and grow a career in digital marketing',
        thumbnail: 'https://img.youtube.com/vi/nU-IIXBWlS4/maxresdefault.jpg',
        duration: '42:18',
        views: '987K',
        channel: 'Neil Patel',
        url: 'https://www.youtube.com/watch?v=nU-IIXBWlS4',
        publishedAt: '2024-11-25'
      },
      {
        id: 'bs-3',
        title: 'Financial Analysis for Business',
        description: 'Learn financial analysis skills for business decision making',
        thumbnail: 'https://img.youtube.com/vi/WEDIj9JBTC8/maxresdefault.jpg',
        duration: '55:12',
        views: '756K',
        channel: 'Corporate Finance Institute',
        url: 'https://www.youtube.com/watch?v=WEDIj9JBTC8',
        publishedAt: '2024-10-15'
      },
      {
        id: 'bs-4',
        title: 'Project Management Career Guide',
        description: 'Complete roadmap to becoming a certified project manager',
        thumbnail: 'https://img.youtube.com/vi/ZKOL-rZ79gs/maxresdefault.jpg',
        duration: '36:44',
        views: '612K',
        channel: 'Project Management Institute',
        url: 'https://www.youtube.com/watch?v=ZKOL-rZ79gs',
        publishedAt: '2024-12-03'
      }
    ],
    documents: [
      {
        id: 'bs-doc-1',
        title: 'The Lean Startup Methodology',
        description: 'Essential guide to building successful startups with lean principles',
        type: 'PDF',
        pages: 336,
        url: 'http://theleanstartup.com/book',
        source: 'Eric Ries',
        difficulty: 'Intermediate'
      },
      {
        id: 'bs-doc-2',
        title: 'Digital Marketing Handbook 2025',
        description: 'Comprehensive guide to modern digital marketing strategies',
        type: 'Guide',
        pages: 428,
        url: 'https://blog.hubspot.com/marketing/digital-marketing-guide',
        source: 'HubSpot',
        difficulty: 'Beginner'
      },
      {
        id: 'bs-doc-3',
        title: 'Financial Modeling Best Practices',
        description: 'Professional guide to financial modeling and analysis',
        type: 'Course',
        url: 'https://www.coursera.org/learn/financial-modeling',
        source: 'Coursera',
        difficulty: 'Advanced'
      },
      {
        id: 'bs-doc-4',
        title: 'MBA Admission Guide 2025',
        description: 'Complete guide to MBA applications and career prospects',
        type: 'Article',
        pages: 89,
        url: 'https://www.mba.com/explore-business-school',
        source: 'GMAC',
        difficulty: 'Intermediate'
      }
    ]
  },
  {
    id: 'data-science',
    name: 'Data Science & Analytics',
    description: 'Data analysis, machine learning, and AI careers',
    icon: '📊',
    videos: [
      {
        id: 'ds-1',
        title: 'Data Science Roadmap 2025 - Complete Guide',
        description: 'Step-by-step guide to becoming a data scientist in 2025',
        thumbnail: 'https://img.youtube.com/vi/ua-CiDNNj30/maxresdefault.jpg',
        duration: '51:33',
        views: '2.4M',
        channel: 'CodeWithHarry',
        url: 'https://www.youtube.com/watch?v=ua-CiDNNj30',
        publishedAt: '2024-12-01'
      },
      {
        id: 'ds-2',
        title: 'Machine Learning Engineer Career Path',
        description: 'How to transition into machine learning engineering',
        thumbnail: 'https://img.youtube.com/vi/aircAruvnKk/maxresdefault.jpg',
        duration: '44:27',
        views: '1.9M',
        channel: '3Blue1Brown',
        url: 'https://www.youtube.com/watch?v=aircAruvnKk',
        publishedAt: '2024-11-18'
      },
      {
        id: 'ds-3',
        title: 'Business Intelligence Analyst Guide',
        description: 'Career guide for business intelligence and analytics roles',
        thumbnail: 'https://img.youtube.com/vi/yZvFH7B6gKI/maxresdefault.jpg',
        duration: '38:15',
        views: '834K',
        channel: 'Data School',
        url: 'https://www.youtube.com/watch?v=yZvFH7B6gKI',
        publishedAt: '2024-10-25'
      },
      {
        id: 'ds-4',
        title: 'Python for Data Science 2025',
        description: 'Complete Python programming course for data science',
        thumbnail: 'https://img.youtube.com/vi/LHBE6Q9XlzI/maxresdefault.jpg',
        duration: '67:42',
        views: '1.6M',
        channel: 'freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=LHBE6Q9XlzI',
        publishedAt: '2024-11-30'
      }
    ],
    documents: [
      {
        id: 'ds-doc-1',
        title: 'Python Data Science Handbook',
        description: 'Comprehensive guide to data science with Python libraries',
        type: 'PDF',
        pages: 548,
        url: 'https://jakevdp.github.io/PythonDataScienceHandbook/',
        source: 'Jake VanderPlas',
        difficulty: 'Intermediate'
      },
      {
        id: 'ds-doc-2',
        title: 'Machine Learning Yearning',
        description: 'Technical strategy for AI engineers by Andrew Ng',
        type: 'PDF',
        pages: 118,
        url: 'https://github.com/ajaymache/machine-learning-yearning',
        source: 'Andrew Ng',
        difficulty: 'Advanced'
      },
      {
        id: 'ds-doc-3',
        title: 'Statistics for Data Science',
        description: 'Essential statistics concepts for data science practitioners',
        type: 'Course',
        url: 'https://www.khanacademy.org/math/statistics-probability',
        source: 'Khan Academy',
        difficulty: 'Beginner'
      },
      {
        id: 'ds-doc-4',
        title: 'Deep Learning Specialization',
        description: 'Complete deep learning course series from Coursera',
        type: 'Course',
        url: 'https://www.coursera.org/specializations/deep-learning',
        source: 'deeplearning.ai',
        difficulty: 'Advanced'
      }
    ]
  },
  {
    id: 'creative-arts',
    name: 'Creative Arts & Design',
    description: 'Graphic design, UI/UX, content creation, and digital arts',
    icon: '🎨',
    videos: [
      {
        id: 'ca-1',
        title: 'UI/UX Design Career Guide 2025',
        description: 'Complete roadmap to becoming a UI/UX designer',
        thumbnail: 'https://img.youtube.com/vi/c9Wg6Cb_YlU/maxresdefault.jpg',
        duration: '43:28',
        views: '1.1M',
        channel: 'AJ&Smart',
        url: 'https://www.youtube.com/watch?v=c9Wg6Cb_YlU',
        publishedAt: '2024-11-22'
      },
      {
        id: 'ca-2',
        title: 'Graphic Design Fundamentals',
        description: 'Essential principles and tools for graphic design',
        thumbnail: 'https://img.youtube.com/vi/YqQx75OPRa0/maxresdefault.jpg',
        duration: '52:15',
        views: '923K',
        channel: 'The Futur',
        url: 'https://www.youtube.com/watch?v=YqQx75OPRa0',
        publishedAt: '2024-12-08'
      },
      {
        id: 'ca-3',
        title: 'Content Creator Career Path',
        description: 'How to build a successful content creation career',
        thumbnail: 'https://img.youtube.com/vi/gho4GeUEOZ8/maxresdefault.jpg',
        duration: '35:44',
        views: '756K',
        channel: 'Peter McKinnon',
        url: 'https://www.youtube.com/watch?v=gho4GeUEOZ8',
        publishedAt: '2024-10-30'
      },
      {
        id: 'ca-4',
        title: 'Digital Art and Illustration Career',
        description: 'Building a career in digital art and illustration',
        thumbnail: 'https://img.youtube.com/vi/ewMksAbgdBI/maxresdefault.jpg',
        duration: '41:12',
        views: '634K',
        channel: 'Proko',
        url: 'https://www.youtube.com/watch?v=ewMksAbgdBI',
        publishedAt: '2024-11-14'
      }
    ],
    documents: [
      {
        id: 'ca-doc-1',
        title: 'The Design of Everyday Things',
        description: 'Classic book on design principles and user experience',
        type: 'PDF',
        pages: 368,
        url: 'https://www.basicbooks.com/titles/don-norman/the-design-of-everyday-things/9780465050659/',
        source: 'Don Norman',
        difficulty: 'Intermediate'
      },
      {
        id: 'ca-doc-2',
        title: 'Adobe Creative Suite Guide',
        description: 'Comprehensive guide to Adobe Creative Cloud tools',
        type: 'Documentation',
        url: 'https://helpx.adobe.com/creative-cloud/user-guide.html',
        source: 'Adobe',
        difficulty: 'Beginner'
      },
      {
        id: 'ca-doc-3',
        title: 'UI/UX Design Portfolio Guide',
        description: 'How to create a compelling design portfolio',
        type: 'Guide',
        pages: 124,
        url: 'https://uxplanet.org/how-to-create-a-ux-portfolio-that-gets-you-hired-5c7d4c0d5f9b',
        source: 'UX Planet',
        difficulty: 'Intermediate'
      },
      {
        id: 'ca-doc-4',
        title: 'Color Theory for Designers',
        description: 'Essential guide to color theory and application in design',
        type: 'Article',
        pages: 67,
        url: 'https://www.interaction-design.org/literature/topics/color-theory',
        source: 'Interaction Design Foundation',
        difficulty: 'Beginner'
      }
    ]
  },
  {
    id: 'education',
    name: 'Education & Teaching',
    description: 'Teaching careers, educational technology, and academic roles',
    icon: '📚',
    videos: [
      {
        id: 'ed-1',
        title: 'Teaching Career Guide 2025',
        description: 'Complete guide to becoming a teacher in the modern era',
        thumbnail: 'https://img.youtube.com/vi/RxsOVK4syxU/maxresdefault.jpg',
        duration: '39:18',
        views: '567K',
        channel: 'Teach for America',
        url: 'https://www.youtube.com/watch?v=RxsOVK4syxU',
        publishedAt: '2024-11-20'
      },
      {
        id: 'ed-2',
        title: 'Educational Technology Careers',
        description: 'Careers in EdTech and educational innovation',
        thumbnail: 'https://img.youtube.com/vi/UCFg9bcW7Bk/maxresdefault.jpg',
        duration: '33:25',
        views: '423K',
        channel: 'EdTechHub',
        url: 'https://www.youtube.com/watch?v=UCFg9bcW7Bk',
        publishedAt: '2024-12-05'
      },
      {
        id: 'ed-3',
        title: 'Academic Research Career Path',
        description: 'Guide to pursuing a career in academic research',
        thumbnail: 'https://img.youtube.com/vi/Unzc731iCUY/maxresdefault.jpg',
        duration: '45:32',
        views: '298K',
        channel: 'The Professor Is In',
        url: 'https://www.youtube.com/watch?v=Unzc731iCUY',
        publishedAt: '2024-10-18'
      },
      {
        id: 'ed-4',
        title: 'Online Course Creation Business',
        description: 'How to create and monetize online educational content',
        thumbnail: 'https://img.youtube.com/vi/isjoZkIw2ww/maxresdefault.jpg',
        duration: '37:44',
        views: '512K',
        channel: 'Pat Flynn',
        url: 'https://www.youtube.com/watch?v=isjoZkIw2ww',
        publishedAt: '2024-11-28'
      }
    ],
    documents: [
      {
        id: 'ed-doc-1',
        title: 'Modern Teaching Methods Guide',
        description: 'Contemporary approaches to effective teaching and learning',
        type: 'Guide',
        pages: 234,
        url: 'https://www.edutopia.org/teaching-strategies-guide',
        source: 'Edutopia',
        difficulty: 'Intermediate'
      },
      {
        id: 'ed-doc-2',
        title: 'Educational Psychology Handbook',
        description: 'Understanding how students learn and develop',
        type: 'PDF',
        pages: 456,
        url: 'https://www.apa.org/ed/schools/teaching-learning',
        source: 'APA',
        difficulty: 'Advanced'
      },
      {
        id: 'ed-doc-3',
        title: 'Digital Learning Tools Guide',
        description: 'Comprehensive guide to educational technology tools',
        type: 'Documentation',
        url: 'https://www.commonsense.org/education/toolkit',
        source: 'Common Sense Education',
        difficulty: 'Beginner'
      },
      {
        id: 'ed-doc-4',
        title: 'Curriculum Development Framework',
        description: 'Guide to designing effective educational curricula',
        type: 'Course',
        pages: 178,
        url: 'https://www.coursera.org/learn/curriculum-design',
        source: 'University of London',
        difficulty: 'Intermediate'
      }
    ]
  }
];

export const getResourcesByCategory = (categoryId: string) => {
  return careerResources.find(category => category.id === categoryId);
};

export const getAllCategories = () => {
  return careerResources.map(category => ({
    id: category.id,
    name: category.name,
    description: category.description,
    icon: category.icon
  }));
};
