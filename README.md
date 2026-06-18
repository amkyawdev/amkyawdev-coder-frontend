# AmkyawDev Frontend

AI-powered development platform inspired by AI Studio and Claude, built with Next.js 15, TypeScript, Tailwind CSS, and Radix UI.

## Features

- 🤖 **AI Agents**: Skill Agents, Long Chain Agents, and Script Agents
- 📦 **System Tools**: Zip Compiler, Deploy Orchestrator, Memory System
- 🎨 **Beautiful UI**: Modern gradient design with Shadcn UI components
- 🌙 **Dark/Light Mode**: Theme switching with system preference detection
- 🌐 **Internationalization**: Support for English and Myanmar languages
- 🔧 **Customizable**: Extensive settings for theme, fonts, and accessibility

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
HUGGING_FACE_API_KEY=your_api_key
```

## Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Dashboard pages
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   ├── agents/           # Agent components
│   ├── systems/          # System components
│   ├── animations/       # Animation components
│   ├── settings/         # Settings components
│   └── layout/           # Layout components
├── lib/                   # Utilities and stores
│   ├── api/              # API client
│   ├── hooks/            # Custom hooks
│   ├── store/            # Zustand stores
│   └── utils/            # Utility functions
├── providers/             # React context providers
├── i18n/                  # Internationalization
└── public/                # Static assets
```

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3
- **Components**: Radix UI + Shadcn UI
- **State Management**: Zustand
- **Animations**: Framer Motion + Lottie
- **Icons**: Lucide React

## License

MIT