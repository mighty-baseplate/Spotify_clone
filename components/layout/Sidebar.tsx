'use client'

import { motion } from 'framer-motion'
import { 
  Target, 
  CheckSquare, 
  Timer, 
  Heart, 
  Music, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react'
import { ActiveSection } from '@/components/Dashboard'

interface SidebarProps {
  activeSection: ActiveSection
  setActiveSection: (section: ActiveSection) => void
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  mobile?: boolean
}

const navItems = [
  { id: 'focus' as ActiveSection, label: 'Daily Focus', icon: Target, color: 'text-blue-400' },
  { id: 'tasks' as ActiveSection, label: 'Tasks', icon: CheckSquare, color: 'text-green-400' },
  { id: 'timer' as ActiveSection, label: 'Timer', icon: Timer, color: 'text-orange-400' },
  { id: 'wellness' as ActiveSection, label: 'Wellness', icon: Heart, color: 'text-red-400' },
  { id: 'music' as ActiveSection, label: 'Music', icon: Music, color: 'text-purple-400' },
]

export default function Sidebar({ 
  activeSection, 
  setActiveSection, 
  collapsed, 
  setCollapsed,
  mobile = false 
}: SidebarProps) {
  
  if (mobile) {
    return (
      <motion.div 
        className="floating-dock rounded-t-3xl p-4"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex flex-col items-center space-y-1 p-3 rounded-xl transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon className={`w-5 h-5 ${
                activeSection === item.id ? 'text-white' : item.color
              }`} />
              <span className="text-xs font-medium">{item.label}</span>
              
              {activeSection === item.id && (
                <motion.div
                  className="h-1 w-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                  layoutId="mobile-indicator"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={`fixed left-0 top-0 h-full z-30 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-80'
      } max-lg:${collapsed ? '-translate-x-full' : '-translate-x-full'}`}
      initial={false}
      animate={{ width: collapsed ? 80 : 320 }}
    >
      <div className="h-full glass-card rounded-none rounded-r-3xl backdrop-blur-xl border-r border-white/20">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-xl font-bold text-white font-display">
                  Productivity
                </h1>
                <p className="text-sm text-white/60">Toolkit</p>
              </motion.div>
            )}
            
            <motion.button
              onClick={() => setCollapsed(!collapsed)}
              className="glass-button p-2 hover:scale-105 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4 text-white" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-white" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 relative overflow-hidden group ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-white/20 to-white/10 text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Icon */}
              <div className={`flex-shrink-0 ${
                activeSection === item.id ? 'text-white' : item.color
              }`}>
                <item.icon className="w-5 h-5" />
              </div>
              
              {/* Label */}
              {!collapsed && (
                <motion.span
                  className="font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.span>
              )}
              
              {/* Active indicator */}
              {activeSection === item.id && (
                <motion.div
                  className="absolute right-2 w-2 h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"
                  layoutId="desktop-indicator"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              
              {/* Hover effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                initial={false}
              />
            </motion.button>
          ))}
        </nav>

        {/* Bottom section */}
        {!collapsed && (
          <motion.div 
            className="absolute bottom-6 left-6 right-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="glass-card p-4 space-y-2">
              <h3 className="text-sm font-medium text-white">Quick Stats</h3>
              <div className="space-y-1 text-xs text-white/60">
                <div className="flex justify-between">
                  <span>Tasks Today</span>
                  <span className="text-green-400">8/12</span>
                </div>
                <div className="flex justify-between">
                  <span>Focus Time</span>
                  <span className="text-blue-400">2h 30m</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}