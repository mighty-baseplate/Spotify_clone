# 🎯 Productivity Toolkit - Glassmorphic Dashboard

A stunning, modern productivity dashboard built with Next.js 14, featuring glassmorphism design, smooth animations, and comprehensive productivity tools. Inspired by Momentum Dash but elevated with beautiful glass-morphic aesthetics.

![Productivity Toolkit](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)

## ✨ Features

### 🎨 **Design & Aesthetics**
- **Glassmorphism UI** - Beautiful glass-morphic cards with backdrop blur effects
- **Smooth Animations** - Powered by Framer Motion for seamless micro-interactions
- **Responsive Design** - Perfect on desktop, tablet, and mobile devices
- **Dark/Light Mode** - Animated theme switching with custom gradients
- **Dynamic Backgrounds** - Rotating background images with overlay gradients

### 🚀 **Core Modules**

#### 📝 **Daily Focus**
- Set and track your main daily objective
- Persistent storage with localStorage
- Visual feedback and success animations
- Helpful tips for productivity

#### ✅ **Task Manager**
- **Three Categories**: Inbox, Today, Done
- **Inline Editing** - Edit tasks directly with keyboard shortcuts
- **Drag & Drop** - Smooth task interactions
- **Real-time Stats** - Track completion progress
- **Auto-categorization** - Smart task organization

#### ⏰ **Pomodoro Timer**
- **25/5 Focus/Break cycles** with automatic transitions
- **Fullscreen Mode** - Distraction-free timer overlay
- **Custom Timer** - Set any duration (1-120 minutes)
- **Audio Notifications** - Timer completion alerts
- **Break Detection** - Automatic work/break switching
- **Settings Panel** - Customize work and break durations

#### 💪 **BMI Calculator & Wellness**
- **Health Metrics** - Calculate BMI with visual feedback
- **Animated Results** - Beautiful result display with progress bars
- **Health Tips** - Category-specific recommendations
- **Target Tracking** - Ideal weight range calculations
- **Progress Visualization** - Color-coded health indicators

#### 🎵 **Music & Ambient Sounds**
- **Two Playlists**: Lo-Fi Beats and Nature Sounds
- **Floating Music Dock** - Persistent mini-player
- **Audio Visualizer** - Animated frequency bars
- **Volume Control** - Smooth volume slider
- **Playlist Management** - Easy track switching
- **Shuffle & Repeat** - Playback control options

### 🎯 **Enhanced Features**
- **Responsive Sidebar** - Collapsible navigation with mobile bottom dock
- **Local Storage** - Persistent data across sessions
- **Animated Transitions** - Smooth page and component transitions
- **Floating Particles** - Subtle background animations
- **Glass Effects** - Advanced backdrop blur and transparency
- **Neon Accents** - Glowing elements and progress indicators

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism utilities
- **Animations**: Framer Motion
- **Icons**: Lucide React + Heroicons
- **Audio**: Howler.js (prepared for integration)
- **State Management**: React Context + useReducer
- **Storage**: localStorage with automatic persistence
- **Themes**: next-themes for dark/light mode switching

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/productivity-toolkit.git
   cd productivity-toolkit
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
productivity-toolkit/
├── app/                          # Next.js 14 App Router
│   ├── globals.css              # Global styles & Tailwind
│   ├── layout.tsx               # Root layout with providers
│   └── page.tsx                 # Main dashboard page
├── components/                   # React components
│   ├── Dashboard.tsx            # Main dashboard orchestrator
│   ├── layout/                  # Layout components
│   │   └── Sidebar.tsx          # Navigation sidebar
│   ├── providers/               # Context providers
│   │   ├── AppProvider.tsx      # Global state management
│   │   └── ThemeProvider.tsx    # Theme switching
│   ├── sections/                # Feature sections
│   │   ├── DailyFocus.tsx       # Daily focus component
│   │   ├── TaskManager.tsx      # Task management
│   │   ├── PomodoroTimer.tsx    # Timer with fullscreen
│   │   ├── BMICalculator.tsx    # Health & wellness
│   │   ├── MusicPlayer.tsx      # Audio player
│   │   └── HeroSection.tsx      # Hero/greeting section
│   └── ui/                      # UI components
│       └── ThemeToggle.tsx      # Dark/light mode toggle
├── public/                      # Static assets
├── tailwind.config.js          # Tailwind configuration
├── next.config.js              # Next.js configuration
└── package.json                # Dependencies
```

## 🎨 Customization

### **Colors & Gradients**
Edit `tailwind.config.js` to customize the color palette:

```javascript
colors: {
  glass: {
    light: 'rgba(255, 255, 255, 0.1)',
    dark: 'rgba(0, 0, 0, 0.1)',
  },
  neon: {
    blue: '#00f5ff',
    purple: '#bf00ff',
    // Add your colors...
  }
}
```

### **Background Images**
Update the background image in `components/providers/AppProvider.tsx`:

```typescript
backgroundImage: 'https://your-image-url.com/background.jpg'
```

### **Glass Effects**
Modify glass components in `app/globals.css`:

```css
.glass-card {
  @apply bg-white/10 backdrop-blur-md border border-white/20;
}
```

## 🚀 Deployment

### **Vercel (Recommended)**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/productivity-toolkit)

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js and configure build settings
3. Deploy with one click!

### **Netlify**

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `out` directory to Netlify

### **Manual Deployment**

1. **Build for production**
   ```bash
   npm run build
   npm start
   ```

2. **Environment Variables** (if needed)
   ```env
   NEXT_PUBLIC_APP_URL=https://yourdomain.com
   ```

## 🔧 Configuration

### **localStorage Structure**
The app persists data in localStorage with this structure:

```json
{
  "dailyFocus": "Complete project documentation",
  "tasks": [
    {
      "id": "1234567890",
      "title": "Review pull request",
      "completed": false,
      "category": "today",
      "createdAt": 1640995200000
    }
  ],
  "bmi": {
    "height": 175,
    "weight": 70,
    "result": 22.9,
    "category": "Normal"
  },
  "music": {
    "isPlaying": false,
    "currentTrack": "lofi-1",
    "volume": 0.7,
    "playlist": "lofi"
  }
}
```

### **Audio Integration**
To add real audio playback:

1. Install Howler.js:
   ```bash
   npm install howler @types/howler
   ```

2. Add audio files to `public/audio/`

3. Update `MusicPlayer.tsx` with Howler integration

## 🎯 Future Enhancements

- [ ] **Real Audio Integration** - Howler.js implementation
- [ ] **Backend Integration** - User accounts and cloud sync
- [ ] **Calendar Integration** - Google Calendar API
- [ ] **Habit Tracking** - Daily habit streaks
- [ ] **Focus Mode** - Website blocker integration
- [ ] **Export Features** - Task export to CSV/PDF
- [ ] **Team Collaboration** - Shared workspaces
- [ ] **Analytics Dashboard** - Productivity insights
- [ ] **Mobile Apps** - React Native companion
- [ ] **Plugin System** - Custom module support

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### **Development Guidelines**
- Use TypeScript for all new code
- Follow the existing component structure
- Add Framer Motion animations for new components
- Ensure responsive design works on all devices
- Test localStorage persistence

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Momentum Dash and glassmorphism design trends
- **UI Components**: Built with Tailwind CSS and Lucide icons
- **Animations**: Powered by Framer Motion
- **Background Images**: Unsplash photography

## 📞 Support

- **Documentation**: [GitHub Wiki](https://github.com/yourusername/productivity-toolkit/wiki)
- **Issues**: [GitHub Issues](https://github.com/yourusername/productivity-toolkit/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/productivity-toolkit/discussions)

---

**Built with ❤️ and ☕ for productivity enthusiasts worldwide**

*Ready to supercharge your productivity? Star ⭐ this repo and start building better habits today!*
