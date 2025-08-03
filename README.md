# 🌟 LakshyaAI — Your Career GPS 🚀

LakshyaAI is a comprehensive digital career counseling platform that empowers students to make **informed career decisions** through **real-world simulations**, **career battles**, **mentor support**, and **AI-powered insights**.

> "India's youth deserve better career clarity. LakshyaAI makes it possible."

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)](https://prisma.io/)
[![Redis](https://img.shields.io/badge/Redis-Real--time-DC382D?style=flat-square&logo=redis)](https://redis.io/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com/)

---

## 🚩 Problem Statement

Millions of students across India, especially from rural and semi-urban areas, struggle with **career confusion**, **lack of direction**, and **limited access to personalized guidance**. Traditional counseling often offers generic advice based on interests, not reality.

**Key Challenges:**
- 📊 **85% of students** are unsure about their career path after 12th grade
- 🏘️ **Limited access** to quality career counseling in rural areas
- 💰 **High cost** of traditional career counseling services
- 📚 **Outdated information** about modern career opportunities
- 🤝 **Lack of mentorship** from industry professionals

---

## 🎯 Our Mission

To build a **smart, interactive platform** that helps students:
- 🎮 Discover career options through **hands-on simulations**
- 📊 Compare real data like salary, work-life balance, and growth prospects
- 🤝 Ask questions to real **verified mentors** who've walked the same path
- 📈 Plan their next steps confidently with **AI-powered insights**
- 🌍 Access quality career guidance **regardless of location**

---

## 🔑 Key Features

### 🎮 **Career Exploration Tools**
- **Career Simulations**: Try out real-world tasks from different careers to see what fits
- **Career Battle**: Compare two careers side-by-side with detailed metrics
- **Visual Life Graph**: Build and visualize your 10-year career journey
- **Self-Discovery Journal**: Understand your goals, values, and strengths through guided prompts

### 🤝 **Mentorship Platform**
- **Real-time Q&A System**: Ask questions and get instant answers from mentors
- **Verified Mentors**: Industry professionals with proven track records
- **Student Dashboard**: Track your questions, progress, and career journey
- **Mentor Dashboard**: Manage questions, provide guidance, and track impact

### 🚀 **Advanced Features**
- **Real-time Notifications**: Get instant updates on mentor responses
- **Role-based Access**: Different interfaces for students, mentors, and admins
- **Secure Authentication**: Powered by Clerk for seamless user management
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Authentication**: Clerk
- **State Management**: React Hooks + Context

### **Backend**
- **Runtime**: Node.js with Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Real-time**: Redis for pub/sub messaging
- **File Storage**: Supabase Storage
- **Caching**: Redis for performance optimization

### **Infrastructure**
- **Database**: Supabase (PostgreSQL)
- **Real-time**: Redis (Railway/Local)
- **Authentication**: Clerk
- **Deployment**: Vercel (Frontend) + Railway (Database)
- **Version Control**: Git + GitHub

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ and npm
- PostgreSQL database (or Supabase account)
- Redis instance (optional for real-time features)
- Clerk account for authentication

### **1. Clone the Repository**
```bash
git clone https://github.com/SnippetTechie/LakshyaAI.git
cd LakshyaAI
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Environment Setup**
Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your-key-here
CLERK_SECRET_KEY=sk_test_your-secret-here

# Clerk Routing
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Database (Supabase)
DATABASE_URL=postgresql://username:password@host:port/database
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Redis (Optional - for real-time features)
REDIS_URL=redis://default:password@host:port
# OR individual config:
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your-password

# Application
NEXT_PUBLIC_APP_NAME=LakshyaAI
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### **4. Database Setup**
```bash
# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Seed the database (optional)
npm run db:seed
```

### **5. Redis Setup (Optional)**
For real-time Q&A features, set up Redis:

**Option A: Local Redis**
```bash
# Install Redis locally
# Windows: Download from https://redis.io/download
# macOS: brew install redis
# Ubuntu: sudo apt install redis-server

# Start Redis
redis-server
```

**Option B: Railway Redis (Recommended)**
1. Visit [Railway.app](https://railway.app)
2. Create a new Redis service
3. Copy the connection URL to your `.env.local`

### **6. Run Development Server**
```bash
npm run dev
```

### **7. Open Your Browser**
Visit [http://localhost:3000](http://localhost:3000) to see LakshyaAI in action!

---

## 📱 Features Overview

### **For Students**
- 🎯 **Career Discovery**: Explore careers through interactive simulations
- ❓ **Ask Questions**: Get answers from verified industry mentors
- 📊 **Career Comparison**: Compare different career paths side-by-side
- 📈 **Progress Tracking**: Monitor your career exploration journey
- 🎮 **Gamified Learning**: Engage with career content through interactive tools

### **For Mentors**
- 💬 **Answer Questions**: Help students with career guidance
- 📋 **Mentor Dashboard**: Manage your mentoring activities
- 🏆 **Impact Tracking**: See how you're helping students grow
- ⚡ **Real-time Notifications**: Get notified of new questions instantly

### **For Administrators**
- 👥 **User Management**: Manage students and mentors
- 📊 **Analytics Dashboard**: Track platform usage and engagement
- ✅ **Mentor Verification**: Approve and verify mentor applications
- 🛠️ **Content Management**: Manage career data and simulations

---

## 🏗️ Project Structure

```
LakshyaAI/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Student dashboard
│   ├── mentor/           # Mentor dashboard
│   ├── onboarding/       # User onboarding
│   └── layout.tsx        # Root layout
├── components/            # React components
│   ├── AskQuestionForm.tsx
│   ├── MentorQuestions.tsx
│   ├── StudentQuestions.tsx
│   └── ...
├── lib/                  # Utility libraries
│   ├── auth.ts          # Authentication helpers
│   ├── prisma.ts        # Database client
│   ├── redis.ts         # Redis client
│   └── supabase.ts      # Supabase client
├── prisma/              # Database schema
│   ├── schema.prisma    # Prisma schema
│   └── seed.ts          # Database seeding
├── hooks/               # Custom React hooks
├── scripts/             # Utility scripts
└── public/              # Static assets
```

---

## 🚀 Deployment

### **Frontend (Vercel)**
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push to main

### **Database (Supabase)**
1. Create a new Supabase project
2. Copy the connection details to your environment variables
3. Run database migrations

### **Redis (Railway)**
1. Create a Redis service on Railway
2. Copy the connection URL to your environment variables

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### **Development Guidelines**
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📊 Database Schema

Our database includes the following main entities:

- **Users**: Students, mentors, and admins
- **Questions**: Student questions with categories and tags
- **Answers**: Mentor responses to questions
- **Careers**: Career information and data
- **Simulations**: Interactive career simulation tasks
- **Mentors**: Verified mentor profiles and expertise

---

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio

# Testing
npm run test:redis   # Test Redis connection
```

---

## 🌟 Roadmap

### **Phase 1: Core Platform** ✅
- [x] User authentication and role management
- [x] Real-time Q&A system
- [x] Basic career exploration tools
- [x] Responsive UI design

### **Phase 2: Enhanced Features** 🚧
- [ ] AI-powered career recommendations
- [ ] Advanced career simulations
- [ ] Video call integration for mentoring
- [ ] Mobile app development

### **Phase 3: Scale & Growth** 📋
- [ ] Multi-language support
- [ ] Advanced analytics and insights
- [ ] Integration with educational institutions
- [ ] Career placement assistance

---


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---


**Built with ❤️ for India's youth by the LakshyaAI team**

*Empowering the next generation with career clarity and confidence* 🚀
