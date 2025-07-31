'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '@/components/providers/AppProvider'
import Sidebar from '@/components/layout/Sidebar'
import HeroSection from '@/components/sections/HeroSection'
import DailyFocus from '@/components/sections/DailyFocus'
import TaskManager from '@/components/sections/TaskManager'
import PomodoroTimer from '@/components/sections/PomodoroTimer'
import BMICalculator from '@/components/sections/BMICalculator'
import MusicPlayer from '@/components/sections/MusicPlayer'
import ThemeToggle from '@/components/ui/ThemeToggle'

export type ActiveSection = 'focus' | 'tasks' | 'timer' | 'wellness' | 'music'

export default function Dashboard() {
  const { state } = useApp()
  const [activeSection, setActiveSection] = useState<ActiveSection>('focus')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'focus':
        return <DailyFocus />
      case 'tasks':
        return <TaskManager />
      case 'timer':
        return <PomodoroTimer />
      case 'wellness':
        return <BMICalculator />
      case 'music':
        return <MusicPlayer />
      default:
        return <DailyFocus />
    }
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{ 
        backgroundImage: `url(${state.backgroundImage})`,
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/60 to-pink-900/80 dark:from-slate-900/90 dark:via-purple-900/80 dark:to-indigo-900/90" />
      
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <Sidebar 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />

        {/* Main Content Area */}
        <div className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-20' : 'ml-80'
        } lg:${sidebarCollapsed ? 'ml-20' : 'ml-80'} max-lg:ml-0`}>
          
          {/* Hero Section - Always visible */}
          <HeroSection />

          {/* Dynamic Content Section */}
          <div className="px-6 pb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderActiveSection()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
        <Sidebar 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          collapsed={false}
          setCollapsed={setSidebarCollapsed}
          mobile
        />
      </div>
    </div>
  )
}