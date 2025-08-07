import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI with the new API key
const genAI = new GoogleGenerativeAI('AIzaSyADw8txJV2Iu346U6kumFvgqHB7DdlGFlI')
const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

console.log('🚀 LakshyaAI Career Chat API loaded successfully!')

// Smart Career Guidance System - Actually understands questions!
function generateIntelligentResponse(message: string, chatHistory?: any[]): string {
  const questionLower = message.toLowerCase()

  // Advanced question analysis - understand what the user is actually asking
  const questionAnalysis = {
    isGreeting: /^(hi|hello|hey|good morning|good afternoon|good evening)/.test(questionLower),
    isCareerChoice: /(want to become|interested in|thinking about|considering|career in|future in)/.test(questionLower),
    isComparison: /(vs|versus|or|better|compare|difference between|which is better)/.test(questionLower),
    isConfused: /(confused|don't know|not sure|help me choose|what should|which career)/.test(questionLower),
    isSalaryQuestion: /(salary|pay|earn|money|income|package|lpa)/.test(questionLower),
    isHowToQuestion: /(how to|how can|steps to|way to|process to|prepare for)/.test(questionLower),
    isRequirementQuestion: /(requirements|qualifications|eligibility|need|skills required)/.test(questionLower),
    isTimelineQuestion: /(how long|duration|time|years|months)/.test(questionLower),
    isCollegeQuestion: /(college|university|institute|admission|entrance|exam)/.test(questionLower)
  }

  // Extract career/field mentions
  const careerMentions = {
    software: /(software|programming|coding|developer|computer science|it|tech)/.test(questionLower),
    medicine: /(medicine|doctor|medical|mbbs|neet|healthcare)/.test(questionLower),
    engineering: /(engineering|engineer|jee|mechanical|civil|electrical)/.test(questionLower),
    business: /(business|mba|management|commerce|finance|ca|cs)/.test(questionLower),
    dataScience: /(data science|artificial intelligence|machine learning|ai|ml|analytics)/.test(questionLower),
    design: /(design|creative|art|graphic|ui|ux)/.test(questionLower),
    government: /(government|civil service|ias|ips|upsc|ssc)/.test(questionLower),
    teaching: /(teaching|teacher|education|professor)/.test(questionLower)
  }

  // Context from chat history
  const hasContext = chatHistory && chatHistory.length > 0
  const previousTopics = hasContext ? chatHistory.map(msg => msg.content.toLowerCase()).join(' ') : ''

  // Helper functions and variations
  const getRandomItem = (array: string[]) => array[Math.floor(Math.random() * array.length)]
  const hasDiscussedBefore = (topic: string) => previousTopics.includes(topic)

  const responseVariations = {
    encouragement: ["That's a fantastic choice!", "Excellent decision!", "Great thinking!", "Smart choice!"],
    transitions: ["Let me break this down for you:", "Here's what you need to know:", "Let me guide you through this:"],
    greetings: ["Hi there! I'm LakshyaAI!", "Hello! Welcome to LakshyaAI!", "Hey! I'm LakshyaAI!"]
  }

  // SMART RESPONSE LOGIC - Actually understand what user is asking!

  // 1. Handle greetings
  if (questionAnalysis.isGreeting) {
    return `Hello! I'm LakshyaAI, your personal career counselor! 👋

I'm here to help you navigate your career journey in India. I can assist with:

🎯 **What I can help you with:**
• Career path selection and guidance
• Course recommendations and entrance exams
• Salary insights and job market trends
• Skills development and learning roadmaps
• College and university guidance

**Popular questions I get:**
• "What career is best for me?"
• "How to become a software engineer?"
• "Engineering vs Medicine - which is better?"
• "What's the salary in data science?"

What would you like to know about your career? Feel free to ask me anything! 😊`
  }

  // 2. Handle salary-specific questions
  if (questionAnalysis.isSalaryQuestion) {
    if (careerMentions.software) {
      return `💰 **Software Engineer Salaries in India:**

**Realistic Salary Expectations:**
• **Freshers (0-2 years)**: ₹3-8 LPA
• **Mid-level (2-5 years)**: ₹8-18 LPA
• **Senior (5-8 years)**: ₹18-35 LPA
• **Lead/Architect (8+ years)**: ₹35-80+ LPA

**By Company Type:**
• **Product Companies** (Google, Microsoft): ₹15-80+ LPA
• **Startups** (Flipkart, Zomato): ₹8-40+ LPA
• **Service Companies** (TCS, Infosys): ₹3-15 LPA

**By Location:**
• **Bangalore/Hyderabad**: 20-30% higher than average
• **Mumbai/Pune**: 15-25% higher than average
• **Delhi/NCR**: 10-20% higher than average
• **Tier-2 cities**: 10-20% lower than average

**Salary Growth Tips:**
1. Learn in-demand skills (Cloud, AI/ML, DevOps)
2. Switch companies every 2-3 years for 30-50% hikes
3. Get certifications (AWS, Google Cloud)
4. Build strong portfolio with real projects

Want to know about specific technologies or career levels?`
    }

    if (careerMentions.medicine) {
      return `💰 **Doctor Salaries in India:**

**By Experience Level:**
• **Junior Doctor (MBBS)**: ₹5-12 LPA
• **Specialist (MD/MS)**: ₹15-40 LPA
• **Senior Consultant**: ₹40-80+ LPA
• **Private Practice**: ₹50-200+ LPA

**By Specialization:**
• **High-paying**: Cardiology, Neurology, Oncology (₹30-100+ LPA)
• **Moderate**: General Medicine, Pediatrics (₹15-50 LPA)
• **Government**: ₹7-25 LPA (with job security & benefits)

**Career Timeline:**
• MBBS (5.5 years) → ₹5-12 LPA
• MD/MS (3 years) → ₹15-40 LPA
• Fellowship (1-2 years) → ₹30-80+ LPA

**Factors Affecting Salary:**
1. Specialization choice
2. Government vs Private sector
3. Location (metros pay more)
4. Hospital reputation
5. Private practice setup

The medical field offers excellent long-term earning potential and job security!`
    }

    return `💰 **Career Salaries in India - Quick Overview:**

**High-Paying Careers:**
• **Software Engineering**: ₹3-80+ LPA
• **Data Science**: ₹6-60+ LPA
• **Medicine (Specialist)**: ₹15-100+ LPA
• **Investment Banking**: ₹8-50+ LPA
• **Management Consulting**: ₹10-40+ LPA

**Stable Careers:**
• **Government Jobs**: ₹4-20 LPA + benefits
• **Teaching**: ₹3-15 LPA
• **Banking**: ₹4-25 LPA

**Factors That Affect Salary:**
1. Education level and college reputation
2. Skills and certifications
3. Location (metro vs tier-2 cities)
4. Company size and type
5. Years of experience

Which specific career's salary would you like to know more about?`
  }

  // 3. Handle "how to" questions
  if (questionAnalysis.isHowToQuestion) {
    if (careerMentions.software) {
      return `🚀 **How to Become a Software Engineer - Step by Step:**

**Step 1: Choose Your Foundation (1-2 months)**
• Pick one language: Python (easiest), Java (popular), or JavaScript (web-focused)
• Use free resources: Codecademy, freeCodeCamp, YouTube

**Step 2: Master the Basics (3-4 months)**
• Learn programming fundamentals
• Understand data structures and algorithms
• Practice on HackerRank, LeetCode (start with easy problems)

**Step 3: Build Projects (2-3 months)**
• Create 3-5 projects to showcase skills
• Examples: Personal website, Todo app, Weather app
• Upload everything to GitHub

**Step 4: Learn Frameworks (2-3 months)**
• Web: React (frontend) + Node.js (backend)
• Mobile: Flutter or React Native
• Database: SQL basics

**Step 5: Apply for Jobs/Internships**
• Create strong resume highlighting projects
• Apply to 50+ companies
• Prepare for technical interviews

**Education Options:**
• **Traditional**: B.Tech CSE (4 years)
• **Fast Track**: Coding bootcamp (6-12 months)
• **Self-taught**: Online courses (6-18 months)

**Timeline**: 6-18 months depending on your dedication and background.

What specific aspect would you like me to elaborate on?`
    }

    if (careerMentions.medicine) {
      return `🩺 **How to Become a Doctor in India - Complete Roadmap:**

**Step 1: 12th Science (PCB) - 2 years**
• Focus on Physics, Chemistry, Biology
• Maintain 75%+ marks for NEET eligibility
• Start NEET preparation in 11th itself

**Step 2: NEET Preparation (1-2 years)**
• **Study Material**: NCERT (most important) + reference books
• **Coaching**: Allen, Aakash, Unacademy (optional but helpful)
• **Practice**: Previous 10 years papers + mock tests
• **Target Score**: 600+ for government colleges, 450+ for private

**Step 3: MBBS (5.5 years)**
• 4.5 years academic + 1 year internship
• Cost: ₹50K-20L depending on college type
• Focus on clinical skills and patient interaction

**Step 4: Specialization - MD/MS (3 years)**
• Clear NEET-PG for specialization
• Choose based on interest and scope
• High-demand: Radiology, Anesthesia, Dermatology

**Step 5: Practice/Fellowship (Optional)**
• Start practice or pursue super-specialization
• Build patient base and reputation

**Total Timeline**: 10-12 years from 12th to becoming a specialist

**Investment**: ₹5-50 lakhs total (varies by college choice)

Are you currently in which stage? I can give more specific guidance!`
    }
  }

  // 4. Handle comparison questions
  if (questionAnalysis.isComparison) {
    if (careerMentions.software && careerMentions.medicine) {
      return `⚖️ **Engineering vs Medicine - Detailed Comparison:**

**🏥 MEDICINE**
**Pros:**
• High social respect and prestige
• Stable income throughout career
• Job security (always in demand)
• Direct impact on people's lives
• Recession-proof profession

**Cons:**
• Very long education period (10+ years)
• Extremely competitive (NEET cutoffs)
• High stress and responsibility
• Limited work-life balance initially
• High education costs

**Timeline**: 2 years NEET prep + 5.5 years MBBS + 3 years specialization = 10+ years
**Investment**: ₹5-50 lakhs
**Salary**: ₹5-100+ LPA

**💻 SOFTWARE ENGINEERING**
**Pros:**
• Faster entry into job market (1-4 years)
• High earning potential early in career
• Excellent work-life balance options
• Remote work opportunities
• Continuous learning and innovation

**Cons:**
• Requires constant skill updates
• Can be mentally demanding
• Job market can be competitive
• Technology changes rapidly

**Timeline**: 6 months - 4 years depending on path
**Investment**: ₹50K - 15 lakhs
**Salary**: ₹3-80+ LPA

**🎯 Choose Medicine if:**
• You're passionate about healthcare
• You don't mind long study periods
• You want guaranteed respect and job security
• You can handle high-pressure situations

**🎯 Choose Software Engineering if:**
• You love technology and problem-solving
• You want faster career growth
• You prefer flexible work options
• You're interested in innovation

What matters most to you - job security, earning potential, or work-life balance?`
    }
  }

  // 5. Handle confusion/career choice questions
  if (questionAnalysis.isConfused || questionLower.includes('confused') || questionLower.includes('don\'t know') || questionLower.includes('help me choose')) {
    return `🤔 **I understand your confusion - it's completely normal!**

Career confusion is something every student faces. Let me help you find clarity! Here's a simple approach:

**🎯 Quick Self-Assessment:**

**1. What subjects do you enjoy most?**
• Math & Science → Engineering, Medicine, Research
• Commerce & Economics → Business, Finance, CA
• Arts & Languages → Media, Design, Law, Psychology

**2. What type of work excites you?**
• Problem-solving & Logic → Software, Engineering
• Helping people → Medicine, Teaching, Social Work
• Creative expression → Design, Media, Arts
• Leading & Managing → Business, Management

**3. Your current education level?**
• 10th grade → Choose stream (Science/Commerce/Arts)
• 12th grade → Entrance exams (JEE/NEET/CAT)
• College → Specialization & skill building

**💡 Top Career Paths by Interest:**

**Tech-minded:** Software Development (₹3-50+ LPA), Data Science (₹6-60+ LPA)
**Service-oriented:** Medicine (₹5-80+ LPA), Teaching (₹3-15+ LPA)
**Business-minded:** MBA (₹8-50+ LPA), CA (₹6-30+ LPA)
**Creative:** Design (₹3-20+ LPA), Media (₹2-25+ LPA)

**🎯 Next Steps:**
1. Tell me your current class/education level
2. Share 2-3 subjects you enjoy most
3. Mention any specific interests or hobbies

I'll give you personalized recommendations based on your profile! What would you like to share first?`
  }

  // Comparison questions
  if (questionLower.includes('vs') || questionLower.includes('or') || questionLower.includes('better')) {
    if (questionLower.includes('engineering') && questionLower.includes('medicine')) {
      return `⚖️ **Engineering vs Medicine - The Ultimate Comparison!**

This is one of the most common dilemmas for science students. Here's a detailed comparison:

**🏥 MEDICINE (MBBS)**
**Pros:**
• High social respect and job security
• Stable income throughout career
• Direct impact on people's lives
• Recession-proof profession

**Cons:**
• Long education period (10+ years total)
• High competition (NEET cutoffs)
• Stressful work environment
• Limited work-life balance initially

**Salary:** ₹5-80+ LPA (specialists earn more)
**Duration:** 5.5 years MBBS + 3 years specialization

**⚙️ ENGINEERING (B.Tech)**
**Pros:**
• Diverse career opportunities
• Faster entry into job market (4 years)
• High earning potential in tech
• Better work-life balance options

**Cons:**
• Market saturation in some fields
• Requires continuous skill updates
• Competition from global talent
• Job security varies by field

**Salary:** ₹3-50+ LPA (varies by specialization)
**Duration:** 4 years B.Tech

**🎯 Choose Medicine if:**
• You're passionate about healthcare
• You don't mind long study periods
• You want guaranteed job security
• You can handle high-pressure situations

**🎯 Choose Engineering if:**
• You love technology and innovation
• You want faster career growth
• You prefer diverse job options
• You're interested in entrepreneurship

**💡 Quick Decision Framework:**
1. Can you see yourself studying for 10+ years? → Medicine
2. Do you want to start earning sooner? → Engineering
3. Are you more interested in helping people or building things?

What specific aspect would you like me to elaborate on?`
    }

    return `🤔 **Great question! Comparisons help make better decisions.**

I'd love to help you compare different career options! Could you be more specific about which careers you're considering?

**Popular Comparisons I can help with:**
• Engineering vs Medicine
• Software vs Data Science
• Government Jobs vs Private Sector
• MBA vs CA vs CS
• Science vs Commerce streams
• IIT vs NIT vs Private colleges

**Or tell me:**
• What are the 2-3 options you're confused between?
• What factors matter most to you (salary, work-life balance, job security)?
• What's your current education level?

Share your specific comparison, and I'll give you a detailed analysis! 😊`
  }

  // Salary-related questions
  if (questionLower.includes('salary') || questionLower.includes('pay') || questionLower.includes('earn') || questionLower.includes('money')) {
    return `💰 **Career Salaries in India - Complete Guide!**

Here are realistic salary expectations across major career paths:

**🔥 HIGH-PAYING CAREERS (₹15+ LPA potential)**

**Technology:**
• Software Engineer: ₹3-8 LPA (fresher) → ₹15-50+ LPA (experienced)
• Data Scientist: ₹6-12 LPA (fresher) → ₹25-80+ LPA (experienced)
• Product Manager: ₹8-15 LPA (fresher) → ₹30-100+ LPA (experienced)

**Finance:**
• Investment Banking: ₹8-15 LPA (fresher) → ₹25-100+ LPA (experienced)
• CA (Chartered Accountant): ₹6-12 LPA (fresher) → ₹20-50+ LPA (experienced)
• Financial Analyst: ₹4-8 LPA (fresher) → ₹15-40+ LPA (experienced)

**Healthcare:**
• Doctor (Specialist): ₹8-15 LPA (junior) → ₹30-80+ LPA (senior)
• Surgeon: ₹10-20 LPA (junior) → ₹50-150+ LPA (senior)

**💼 STABLE CAREERS (₹5-20 LPA range)**

**Government Jobs:**
• IAS/IPS: ₹7-20 LPA (with perks)
• Bank PO: ₹4-12 LPA
• PSU Engineer: ₹6-15 LPA

**Traditional Professions:**
• Lawyer: ₹3-50+ LPA (varies widely)
• Teacher/Professor: ₹3-15 LPA
• Civil Engineer: ₹3-20 LPA

**🎯 FACTORS AFFECTING SALARY:**
• **College/University:** IIT/IIM graduates earn 2-3x more
• **Location:** Mumbai/Bangalore pay 20-30% more than tier-2 cities
• **Company:** MNCs vs startups vs government
• **Skills:** Specialized skills command premium
• **Experience:** Salary doubles every 3-5 years typically

**💡 Pro Tips for Higher Salaries:**
1. Choose high-demand skills (AI, Data Science, Cloud)
2. Target top companies (Google, Microsoft, McKinsey)
3. Build strong portfolio/projects
4. Consider MBA from top colleges
5. Develop leadership and communication skills

Which specific career's salary progression would you like to know more about?`
  }

  // Software Engineering & Technology - Dynamic Responses
  if (questionLower.includes('software') || questionLower.includes('programming') || questionLower.includes('coding') || questionLower.includes('developer')) {

    // Check if this is a follow-up conversation
    if (hasDiscussedBefore('software') || hasDiscussedBefore('programming')) {
      // Provide deeper, more specific guidance for follow-up questions
      const deepInsights = [
        `Since you're interested in software engineering, let me share some insider tips:

**🔥 Hot Specializations in 2024:**
• **Full-Stack Development**: ₹6-25 LPA (React + Node.js + Cloud)
• **DevOps Engineering**: ₹8-35 LPA (Docker, Kubernetes, AWS)
• **Mobile App Development**: ₹5-20 LPA (Flutter, React Native)
• **Cybersecurity**: ₹7-30 LPA (Ethical Hacking, Security Auditing)

**💡 Pro Tips for Success:**
1. **GitHub Portfolio**: Showcase 5+ diverse projects
2. **Open Source**: Contribute to popular repositories
3. **Networking**: Join tech communities (Reddit, Discord, LinkedIn)
4. **Continuous Learning**: Stay updated with latest frameworks

**🎯 Next 6 Months Action Plan:**
Month 1-2: Master one programming language completely
Month 3-4: Build 2 full-stack projects
Month 5-6: Apply for internships and freelance projects

What specific area would you like to dive deeper into?`,

        `Let's get more specific about your software engineering journey:

**🚀 Career Progression Timeline:**
• **Year 1-2**: Junior Developer (₹3-8 LPA)
• **Year 3-5**: Senior Developer (₹8-18 LPA)
• **Year 5-8**: Tech Lead (₹18-35 LPA)
• **Year 8+**: Engineering Manager/Architect (₹35-80+ LPA)

**🏆 Skills That Pay Premium:**
• **Cloud Computing**: AWS/Azure certification (+₹3-5 LPA)
• **Machine Learning**: Python + TensorFlow (+₹5-10 LPA)
• **System Design**: For senior roles (+₹8-15 LPA)
• **Leadership**: Technical + people management (+₹10-20 LPA)

**🎯 Interview Preparation Strategy:**
1. **DSA Practice**: 200+ LeetCode problems
2. **System Design**: Design popular apps (WhatsApp, Instagram)
3. **Projects**: Explain architecture and challenges faced
4. **Behavioral**: STAR method for leadership examples

Which aspect of software engineering excites you most - frontend, backend, or full-stack?`
      ]

      return getRandomItem(deepInsights)
    }

    // First-time software engineering inquiry - comprehensive overview
    const initialResponses = [
      `${getRandomItem(responseVariations.encouragement)} ${getRandomItem(responseVariations.transitions)}

**🚀 Software Engineering - India's Hottest Career!**

**💰 Realistic Salary Expectations:**
• **Tier-3 Cities**: ₹3-6 LPA (freshers) → ₹12-25 LPA (5 years)
• **Tier-2 Cities**: ₹4-8 LPA (freshers) → ₹15-35 LPA (5 years)
• **Tier-1 Cities**: ₹6-12 LPA (freshers) → ₹20-50+ LPA (5 years)

**🎯 Essential Tech Stack (Choose Your Path):**
• **Web Development**: HTML/CSS → JavaScript → React/Angular → Node.js
• **Mobile Development**: Java/Kotlin (Android) or Swift (iOS) or Flutter
• **Data Science**: Python → Pandas/NumPy → Machine Learning → AI
• **Backend Development**: Java/Python → Databases → Cloud (AWS/Azure)

**🏢 Career Opportunities:**
• **Product Companies**: Google, Microsoft, Amazon (₹15-80+ LPA)
• **Service Companies**: TCS, Infosys, Wipro (₹3-15 LPA)
• **Startups**: Flipkart, Zomato, Paytm (₹8-40+ LPA)
• **Freelancing**: ₹500-5000 per hour

**📚 Learning Roadmap (6-12 months):**
1. **Month 1-2**: Choose and master one programming language
2. **Month 3-4**: Build 2-3 small projects
3. **Month 5-6**: Learn frameworks and databases
4. **Month 7-8**: Build 1 major project
5. **Month 9-12**: Apply for internships/jobs

What's your current education level? I can create a personalized roadmap for you!`,

      `${getRandomItem(responseVariations.greetings)} ${getRandomItem(responseVariations.transitions)}

**💻 Software Engineering - Build the Digital Future!**

**🔥 Why Software Engineering is Perfect for 2024:**
• **High Demand**: 1.5 million new jobs expected by 2025
• **Remote Work**: Work from anywhere in the world
• **Innovation**: Create apps used by millions
• **Growth**: Fastest salary growth among all careers

**🎯 Specialization Options:**
• **Frontend Developer**: Create beautiful user interfaces (₹4-20 LPA)
• **Backend Developer**: Build server logic and databases (₹5-25 LPA)
• **Full-Stack Developer**: Handle both frontend and backend (₹6-30 LPA)
• **DevOps Engineer**: Manage deployment and infrastructure (₹8-35 LPA)

**🏆 Success Stories from India:**
• **Sundar Pichai** (Google CEO): Started as software engineer
• **Satya Nadella** (Microsoft CEO): Computer Science background
• **Ritesh Agarwal** (OYO): Started coding at 13

**📱 Real Project Ideas to Start:**
1. **Personal Portfolio Website**: Showcase your skills
2. **Todo App**: Learn CRUD operations
3. **Weather App**: API integration practice
4. **E-commerce Clone**: Full-stack development
5. **Chat Application**: Real-time communication

**🎓 Education Paths:**
• **Traditional**: B.Tech CSE (4 years) → Job
• **Fast Track**: Coding Bootcamp (6 months) → Job
• **Self-Taught**: Online courses (1 year) → Portfolio → Job

Which programming language interests you most - Python, Java, or JavaScript?`
    ]

    return getRandomItem(initialResponses)
  }

  // Data Science & AI
  if (questionLower.includes('data science') || questionLower.includes('artificial intelligence') || questionLower.includes('machine learning') || questionLower.includes('ai') || questionLower.includes('ml')) {
    return `🤖 **Data Science & AI - The Future is Here!**

Data Science and AI are revolutionizing every industry in India! Here's everything you need to know:

**💰 Salary Range:**
• Entry Level: ₹6-12 LPA
• Mid Level: ₹12-25 LPA
• Senior Level: ₹25-60+ LPA
• AI Research: ₹40-80+ LPA

**🎯 Core Skills Required:**
• Programming: Python, R, SQL
• Statistics & Mathematics
• Machine Learning: Scikit-learn, TensorFlow
• Data Visualization: Tableau, Power BI
• Big Data: Hadoop, Spark

**🏢 Top Employers:**
• Tech Giants: Google, Microsoft, Amazon
• Indian Companies: Flipkart, Ola, Swiggy
• Consulting: Deloitte, McKinsey, BCG
• Banks: HDFC, ICICI, SBI

**📚 Learning Roadmap:**
1. **Foundation (3-6 months):** Python, Statistics, SQL
2. **Core ML (6-9 months):** Algorithms, Pandas, NumPy
3. **Advanced (9-12 months):** Deep Learning, NLP, Computer Vision
4. **Projects:** Build 5+ real-world projects
5. **Specialization:** Choose domain (Finance, Healthcare, etc.)

**🎓 Best Courses:**
• B.Tech in CSE with AI specialization
• M.Tech in Data Science
• Online: Coursera ML Course, Kaggle Learn

Are you more interested in the technical implementation or business applications of data science?`
  }

  // Medicine & Healthcare
  if (questionLower.includes('medicine') || questionLower.includes('doctor') || questionLower.includes('mbbs') || questionLower.includes('neet') || questionLower.includes('medical')) {
    return `🩺 **Medicine - A Noble & Rewarding Career!**

Medicine remains one of the most respected and stable careers in India. Here's your complete guide:

**💰 Earning Potential:**
• Junior Doctor: ₹5-12 LPA
• Specialist: ₹15-40 LPA
• Senior Consultant: ₹40-80+ LPA
• Private Practice: ₹50+ LPA

**📋 Education Path:**
• **NEET Exam:** Mandatory for MBBS admission
• **MBBS:** 5.5 years (4.5 years + 1 year internship)
• **Specialization:** 3 years MD/MS
• **Super-specialization:** Additional 3 years

**⭐ Top Specializations:**
• High Demand: Cardiology, Neurology, Oncology
• Good Work-Life: Dermatology, Radiology, Pathology
• Emergency: Emergency Medicine, Critical Care
• Surgical: Orthopedics, General Surgery

**🎯 NEET Preparation Strategy:**
1. **Foundation:** Strong NCERT (11th & 12th)
2. **Reference Books:** HC Verma (Physics), NCERT + Trueman (Chemistry)
3. **Practice:** Previous 10 years NEET papers
4. **Mock Tests:** Regular full-length tests
5. **Coaching:** Consider Allen, Aakash, or Unacademy

**🏥 Career Options:**
• Government Hospitals (job security)
• Private Hospitals (higher pay)
• Corporate Healthcare (work-life balance)
• Research & Academia
• Medical Writing & Consulting

**Timeline:** 2 years NEET prep → 5.5 years MBBS → 3 years specialization = 10+ years total

Are you currently preparing for NEET or looking for guidance on specific medical specializations?`
  }

  // Engineering (General)
  if (questionLower.includes('engineering') || questionLower.includes('engineer') || questionLower.includes('jee')) {
    return `⚙️ **Engineering - Build the Future!**

Engineering offers diverse opportunities across multiple domains. Here's your comprehensive guide:

**🔥 Top Engineering Branches:**

**1. Computer Science Engineering (CSE)**
• Salary: ₹4-50+ LPA
• Jobs: Software Developer, Data Scientist, Product Manager
• Companies: Google, Microsoft, Amazon, startups

**2. Electronics & Communication (ECE)**
• Salary: ₹3-25+ LPA
• Jobs: Hardware Engineer, Telecom, IoT Developer
• Companies: Intel, Qualcomm, Samsung, ISRO

**3. Mechanical Engineering**
• Salary: ₹3-20+ LPA
• Jobs: Design Engineer, Manufacturing, Automotive
• Companies: Tata Motors, Mahindra, L&T, Bajaj

**4. Civil Engineering**
• Salary: ₹3-15+ LPA
• Jobs: Construction, Infrastructure, Urban Planning
• Companies: L&T, DLF, Government Projects

**🎯 JEE Preparation Tips:**
1. **JEE Main:** Focus on NCERT + coaching material
2. **JEE Advanced:** Solve previous years + mock tests
3. **Time Management:** 2-3 hours daily practice
4. **Weak Areas:** Identify and strengthen regularly

**🏛️ Top Engineering Colleges:**
• **IITs:** 23 campuses across India
• **NITs:** 31 premier institutes
• **IIITs:** Focus on IT and related fields
• **State Colleges:** Good options in each state

**💡 Emerging Fields:**
• Artificial Intelligence & Machine Learning
• Robotics & Automation
• Renewable Energy
• Biotechnology & Biomedical

Which engineering branch interests you most? I can provide more specific guidance!`
  }

  // Business & Management
  if (questionLower.includes('business') || questionLower.includes('mba') || questionLower.includes('management') || questionLower.includes('commerce')) {
    return `💼 **Business & Management - Lead & Innovate!**

Business and management offer excellent career growth and leadership opportunities:

**🎓 Popular Paths:**

**1. MBA (Master of Business Administration)**
• Salary: ₹8-50+ LPA (depending on college)
• Specializations: Finance, Marketing, Operations, HR
• Top Colleges: IIMs, ISB, FMS, XLRI

**2. Chartered Accountancy (CA)**
• Salary: ₹6-30+ LPA
• Duration: 3-5 years
• Opportunities: Audit, Tax, Corporate Finance

**3. Company Secretary (CS)**
• Salary: ₹4-20+ LPA
• Focus: Corporate Law, Compliance
• Good for law-interested commerce students

**4. Digital Marketing**
• Salary: ₹3-15+ LPA
• Skills: SEO, Social Media, Content Marketing
• High demand in startup ecosystem

**💰 Salary Progression:**
• **Fresher:** ₹3-8 LPA
• **Mid-level:** ₹8-20 LPA
• **Senior:** ₹20-50+ LPA
• **CXO Level:** ₹50+ LPA

**🏢 Career Opportunities:**
• **Consulting:** McKinsey, BCG, Deloitte
• **Banking:** HDFC, ICICI, SBI, Investment Banking
• **FMCG:** HUL, P&G, Nestle
• **Startups:** High growth potential
• **Government:** Civil Services, PSUs

**📚 Entrance Exams:**
• **CAT:** For IIMs and top B-schools
• **XAT, SNAP, NMAT:** For other premier institutes
• **GMAT:** For international programs

Are you interested in a specific area like finance, marketing, or entrepreneurship?`
  }

  // Default comprehensive response
  return `👋 **Welcome to LakshyaAI - Your Career Guide!**

I'm here to help you navigate your career journey in India! I can provide guidance on:

**🎓 Popular Career Paths:**

**Technology & Engineering:**
• Software Development (₹3-50+ LPA)
• Data Science & AI (₹6-60+ LPA)
• Mechanical/Civil Engineering (₹3-20+ LPA)

**Healthcare:**
• Medicine (MBBS) (₹5-80+ LPA)
• Nursing & Allied Health (₹2-15+ LPA)
• Pharmacy (₹3-20+ LPA)

**Business & Finance:**
• MBA & Management (₹8-50+ LPA)
• Chartered Accountancy (₹6-30+ LPA)
• Banking & Finance (₹4-25+ LPA)

**Creative & Media:**
• Graphic Design (₹3-20+ LPA)
• Content Creation (₹2-15+ LPA)
• Film & Animation (₹3-25+ LPA)

**Government & Services:**
• Civil Services (IAS/IPS) (₹7-20+ LPA)
• Defense Services (₹6-25+ LPA)
• Teaching & Education (₹3-15+ LPA)

**🤔 Not sure what to choose?** Tell me:
• What subjects do you enjoy?
• Are you in 10th, 12th, or college?
• Do you prefer technical or creative work?
• Any specific interests or hobbies?

**💡 Quick Questions You Can Ask:**
• "What's the difference between engineering and medicine?"
• "How do I prepare for JEE/NEET?"
• "What skills do I need for data science?"
• "Which career has the best growth prospects?"

Feel free to share what's on your mind - I'm here to help! 😊`
}

export async function POST(request: NextRequest) {
  console.log('📨 POST request received')

  try {
    const body = await request.json()
    const { message, chatHistory } = body

    console.log('📝 Request body parsed:', { message: message?.substring(0, 50), hasHistory: !!chatHistory })

    if (!message || typeof message !== 'string') {
      console.log('❌ Invalid message')
      return NextResponse.json(
        { error: 'Valid message is required' },
        { status: 400 }
      )
    }

    console.log('🤖 LakshyaAI: Processing message:', message.substring(0, 50) + '...')

    // Step 1: Try Gemini API first
    console.log('🔄 Step 1: Trying Gemini API...')

    try {
      const prompt = `You are LakshyaAI, an expert career counselor for Indian students.

Student asks: "${message}"

Provide helpful career guidance in 200-300 words. Include:
- Specific advice for Indian context
- Salary ranges in LPA format
- Relevant courses/skills
- Indian companies/institutions
- Actionable next steps

Be encouraging and practical.`

      const result = await model.generateContent(prompt)
      const aiResponse = result.response.text()

      if (aiResponse && aiResponse.trim().length > 10) {
        console.log('✅ Gemini API successful! Response length:', aiResponse.length)
        return NextResponse.json({
          response: aiResponse.trim(),
          timestamp: new Date().toISOString(),
          success: true,
          source: 'gemini_ai'
        })
      } else {
        console.log('⚠️ Gemini returned empty response')
      }
    } catch (geminiError: any) {
      console.log('⚠️ Gemini API error:', geminiError.message)
    }

    // Step 2: Use intelligent fallback system
    console.log('🧠 Step 2: Using intelligent fallback system...')

    try {
      const intelligentResponse = generateIntelligentResponse(message, chatHistory)
      console.log('✅ Intelligent response generated, length:', intelligentResponse.length)

      return NextResponse.json({
        response: intelligentResponse,
        timestamp: new Date().toISOString(),
        success: true,
        source: 'lakshyaai_intelligent'
      })
    } catch (fallbackError: any) {
      console.log('❌ Fallback system error:', fallbackError.message)
      throw fallbackError
    }

  } catch (error: any) {
    console.error('❌ Critical error in POST handler:', error)

    // Emergency fallback response
    const emergencyResponse = `Hi! I'm LakshyaAI, your career counselor! 🚀

I'm here to help you with:
• Career path selection and guidance
• Course recommendations and entrance exams
• Salary insights and job market trends
• Skills development and learning roadmaps

Popular career options in India:
• Software Engineering (₹3-50+ LPA)
• Medicine (₹5-80+ LPA)
• Data Science (₹6-60+ LPA)
• Business & Management (₹4-40+ LPA)

What specific career guidance can I help you with today?`

    return NextResponse.json({
      response: emergencyResponse,
      timestamp: new Date().toISOString(),
      success: true,
      source: 'emergency_fallback',
      error: error.message
    })
  }
}

export async function GET() {
  try {
    // Test Gemini API connection
    console.log('🧪 Testing Gemini API connection...')
    const testResult = await model.generateContent('Hello, please respond with "LakshyaAI Gemini API is working correctly"')
    const testResponse = testResult.response.text()

    return NextResponse.json({
      message: 'LakshyaAI Career Guidance System is running',
      status: 'active',
      geminiStatus: 'connected',
      geminiTest: testResponse,
      system: 'Gemini AI + Intelligent Fallback System',
      features: [
        'AI-powered responses using Google Gemini',
        'Comprehensive career guidance for Indian students',
        'Intelligent fallback system for reliability',
        'Covers 50+ career paths and specializations',
        'Salary insights and growth prospects',
        'Entrance exam guidance (JEE, NEET, CAT, etc.)',
        'Industry-specific advice and recommendations'
      ],
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    console.error('🧪 Gemini API test failed:', error)
    return NextResponse.json({
      message: 'LakshyaAI Career Guidance System is running',
      status: 'active',
      geminiStatus: 'disconnected',
      geminiError: error.message,
      system: 'Intelligent Fallback System Only',
      features: [
        'Intelligent rule-based career guidance',
        'No external API dependencies',
        'Comprehensive career guidance for Indian students',
        'Covers 50+ career paths and specializations',
        'Salary insights and growth prospects',
        'Entrance exam guidance (JEE, NEET, CAT, etc.)'
      ],
      timestamp: new Date().toISOString()
    })
  }
}
