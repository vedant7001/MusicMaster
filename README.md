# MusicEdu - Gamified Music Education Platform

MusicEdu is a full-stack web application designed to make learning music engaging and fun through gamification. Built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

- **User Authentication**: Sign up, login with email/password or social providers
- **Course Library**: Browse and enroll in music courses by instrument, genre, and difficulty
- **Gamification**: Earn XP, badges, and compete on leaderboards
- **Progress Tracking**: Monitor lesson completion and learning streaks
- **Quiz System**: Test your knowledge with interactive quizzes
- **Video Lessons**: Learn with integrated video content
- **Responsive Design**: Fully responsive UI for all devices
- **Admin Dashboard**: Manage courses, users, and view analytics

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **State Management**: Zustand
- **Routing**: React Router
- **UI Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/music-edu.git
   cd music-edu
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example` and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Supabase Setup

1. Create a new Supabase project
2. Use the SQL schema provided in `supabase/schema.sql` to set up your database tables
3. Configure authentication providers in the Supabase dashboard
4. Set up storage buckets for course images and video content

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── courses/        # Course-related components
│   ├── gamification/   # Badges, XP, leaderboard components
│   ├── layout/         # App layout components
│   └── ui/             # Basic UI elements
├── lib/                # Utilities and services
│   ├── store/          # Zustand state stores
│   └── supabase.ts     # Supabase client
├── pages/              # Page components
│   ├── admin/          # Admin dashboard pages
│   ├── auth/           # Login/Register pages
│   ├── courses/        # Course listing and details
│   ├── dashboard/      # User dashboard
│   └── lessons/        # Lesson and quiz pages
├── types/              # TypeScript type definitions
├── App.tsx             # Main app component with routing
└── main.tsx           # Entry point
```

## Deployment

The application is configured for deployment on Vercel.

1. Connect your GitHub repository to Vercel
2. Configure environment variables in the Vercel dashboard
3. Deploy!

## License

This project is licensed under the MIT License - see the LICENSE file for details.