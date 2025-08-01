# Lakshya.ai - Career Clarity Platform

A Next.js-based career guidance platform designed to help India's youth discover, compare, and plan their careers through real insights and hands-on experience.

## 🚀 Features

- **Career Simulator**: Interactive challenges and mini-games to experience real career tasks
- **Career Battle**: Side-by-side comparison of different career paths
- **Visual Life Graph**: 10-year career planning with milestones and salary projections
- **Self-Discovery Journal**: Guided reflection prompts for career decision-making
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend Ready**: API routes structure for easy backend integration
- **Database Ready**: Type definitions and API structure prepared for database connection

## 📁 Project Structure

```
lakshya-ai/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── careers/       # Career data endpoints
│   │   ├── simulations/   # Simulation endpoints
│   │   └── user/          # User-related endpoints
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── CareerToolsSection.tsx
│   ├── CareerSimulatorPreview.tsx
│   └── Footer.tsx
├── lib/                   # Utility libraries
│   ├── types.ts          # TypeScript type definitions
│   └── api.ts            # API utility functions
├── public/               # Static assets
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lakshya-ai
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Backend Integration Ready

The project is structured to easily connect with backend services:

### API Routes
- `/api/careers` - Career data management
- `/api/simulations` - Career simulation data
- `/api/user/preferences` - User preference management

### Type Safety
- Centralized type definitions in `lib/types.ts`
- API utility functions in `lib/api.ts`
- Consistent data models across frontend and backend

### Database Integration Points
- User authentication system ready
- Career data models defined
- Simulation progress tracking prepared
- User preferences and analytics ready

## 🎨 Design System

### Colors
- Primary Blue: `#4f46e5`
- Orange Accent: `#f97316`
- Success Green: `#10b981`
- Purple: `#8b5cf6`

### Components
- Responsive navigation with mobile menu
- Interactive career selector
- Tool cards with hover effects
- Simulation preview cards
- Glass morphism effects

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interactions
- Optimized for various screen sizes

## 🔮 Future Enhancements

### Backend Integration
- [ ] User authentication (JWT/OAuth)
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Real-time career data updates
- [ ] Analytics and user tracking
- [ ] Mentor booking system

### Features
- [ ] AI-powered career recommendations
- [ ] Video-based simulations
- [ ] Peer comparison and networking
- [ ] Career counselor integration
- [ ] Progress tracking and achievements

### Technical
- [ ] PWA capabilities
- [ ] Offline mode
- [ ] Performance optimization
- [ ] SEO enhancements
- [ ] Accessibility improvements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

---

Built with ❤️ for India's youth by the Lakshya.ai team
