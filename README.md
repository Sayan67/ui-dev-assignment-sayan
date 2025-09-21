# UI Development Assignment - Modern Dashboard Application

A modern, responsive dashboard application built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui. This project demonstrates pixel-perfect implementation of a Figma design with advanced state management, animations, and comprehensive functionality.

## 🔗 Live Demo

**Live Application**: [https://ui-dev-assignment-sayan.vercel.app/](https://ui-dev-assignment-sayan.vercel.app/)

## 🚀 Key Features

### Core Functionality
- **🌓 Dark/Light Theme Toggle**: Seamless theme switching with persistent user preferences
- **📱 Fully Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **🧭 Routing-Based Navigation**: URL-driven navigation with React Router
- **🎯 Pixel-Perfect Implementation**: Precise design replication from Figma
- **🎨 Modern UI Components**: Built with shadcn/ui for consistency and accessibility

### Interactive Components
- **📊 Interactive Data Visualizations**: 
  - Real-time charts using Recharts
  - Interactive world map with AmCharts 5
  - Revenue trends and projections
  - Sales channel distribution
- **📋 Advanced Data Tables**:
  - Global search functionality
  - Column sorting and filtering
  - Pagination with custom controls
  - Row selection capabilities
- **✨ Smooth Animations**: Microinteractions using Framer Motion

### State Management
- **Redux Toolkit**: Centralized state management for:
  - Dashboard metrics and KPIs
  - User interface states
  - Theme preferences
  - Search functionality

## 🛠️ Technology Stack

### Frontend Core
- **React** 19.1.1 - Latest React with concurrent features
- **TypeScript** 5.8.3 - Full type safety
- **Vite** 7.1.6 - Lightning-fast build tool
- **React Router DOM** 7.9.1 - Client-side routing

### Styling & UI
- **Tailwind CSS** 4.1.13 - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible component library
- **Framer Motion** 12.23.16 - Animation library
- **Lucide React** & **React Icons** - Icon libraries

### Data Visualization
- **Recharts** 2.15.4 - Composable charting library
- **AmCharts 5** 5.13.6 - Advanced mapping visualization

### State & Data Management
- **Redux Toolkit** 2.9.0 - Modern Redux with less boilerplate
- **TanStack React Table** 8.21.3 - Powerful table functionality

### Development Tools
- **ESLint** 9.35.0 - Code quality enforcement
- **TypeScript ESLint** - TypeScript-specific linting
- **Vercel Analytics** - Performance monitoring

## 📋 Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** or **yarn** package manager
- **Git** for version control

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ui-dev-assignment-sayan.git
cd ui-dev-assignment-sayan
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Start Development Server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
# or
yarn build
```

### 5. Preview Production Build
```bash
npm run preview
# or
yarn preview
```

## 📁 Project Structure

```
src/
├── components/              # React components
│   ├── layout/             # Layout components
│   │   ├── Layout.tsx      # Main layout wrapper
│   │   ├── Header.tsx      # App header with search
│   │   ├── SidebarWithRouter.tsx  # Navigation sidebar
│   │   └── RightSidebar.tsx       # Notifications panel
│   ├── dashboard/          # Dashboard components
│   │   ├── Default.tsx     # Main dashboard view
│   │   ├── charts/         # Chart components
│   │   │   ├── ProjectionsChart.tsx
│   │   │   ├── RevenueChart.tsx
│   │   │   ├── WorldMap.tsx
│   │   │   └── SalesDonutChart.tsx
│   │   └── orders/         # Order management
│   │       └── OrdersList.tsx  # Advanced data table
│   └── ui/                 # Base UI components
│       ├── button.tsx      # Button variants
│       ├── card.tsx        # Card containers
│       ├── table.tsx       # Table components
│       └── ...             # Other shadcn/ui components
├── hooks/                  # Custom React hooks
│   └── redux.ts           # Typed Redux hooks
├── lib/                    # Utilities
│   └── utils.ts           # Helper functions
├── router/                 # Routing configuration
│   └── index.tsx          # Route definitions
├── store/                  # Redux store
│   ├── index.ts           # Store configuration
│   └── slices/            # Redux slices
│       ├── dashboardSlice.ts  # Dashboard data
│       └── uiSlice.ts         # UI state
├── styles/                 # Global styles
│   └── globals.css        # Tailwind directives
└── main.tsx               # Application entry
```

## 🎨 Design System

### Theme Configuration
- **CSS Custom Properties**: Dynamic theme variables
- **Dark/Light Modes**: System preference detection
- **Custom Color Palette**:
  - Primary: Blue/Purple gradients
  - Secondary: Cyan/Indigo accents
  - Semantic colors for status indicators

### Component Architecture
- **Modular Components**: Reusable UI building blocks
- **Composition Pattern**: Flexible component composition
- **Responsive Utilities**: Mobile-first design approach

## ⚡ Performance Optimizations

- **Code Splitting**: Route-based lazy loading
- **Bundle Optimization**: Vite's efficient bundling
- **Asset Optimization**: Compressed images and icons
- **Memoization**: Strategic use of React optimization hooks
- **CSS Purging**: Removing unused Tailwind classes

## 🧪 Key Components

### Dashboard (`/src/components/dashboard/Default.tsx`)
- KPI cards with trend indicators
- Interactive charts and visualizations
- Responsive grid layout
- Real-time data updates

### Orders Table (`/src/components/dashboard/orders/OrdersList.tsx`)
- Advanced filtering and sorting
- Pagination with size options
- Row selection functionality
- Status indicators with colors
- Export capabilities

### Navigation Sidebar (`/src/components/layout/SidebarWithRouter.tsx`)
- Hierarchical menu structure
- Active route highlighting
- Collapsible sections
- Smooth animations

## 🚢 Deployment

### Vercel Deployment
The application is deployed on Vercel with:
- Automatic deployments from main branch
- Preview deployments for pull requests
- Built-in analytics and monitoring
- Optimized for global CDN delivery

### Environment Variables
No environment variables required for basic deployment.

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Building
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint checks
npm run type-check   # Run TypeScript compiler checks
```

## 📊 Features Implementation Status

### ✅ Completed
- Project setup and configuration
- Theme system with dark/light modes
- Responsive layout components
- Navigation with routing
- Dashboard with KPI cards
- Interactive charts (5 types)
- Advanced data tables
- Search functionality
- Redux state management
- Animations and microinteractions
- Production deployment

### 🔄 Future Enhancements
- Unit and integration testing
- E2E testing with Playwright
- Performance monitoring
- Advanced accessibility features
- Real-time data integration
- Multi-language support
- PWA capabilities
- Advanced analytics dashboard

## 🤝 Contributing

This project was created as a UI development assignment demonstration. For any questions or feedback, please contact the author.

## 👨‍💻 Author

**Sayan Das**
- GitHub: [@Sayan67](https://github.com/Sayan67)
- Portfolio: [My Portfolio](https://sayan-portfolio-peach.vercel.app)

## 📄 License

All rights reserved.

---

Built with ❤️ by Sayan Das