'use client'

import { motion } from 'framer-motion'
import { useApp } from '@/components/providers/AppProvider'
import { Sparkles, Calendar } from 'lucide-react'

export default function HeroSection() {
  const { state } = useApp()
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <motion.section 
      className="relative px-6 pt-12 pb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Greeting */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 font-display">
            {state.greeting}
          </h1>
          <div className="flex items-center justify-center space-x-2 text-white/70">
            <Calendar className="w-4 h-4" />
            <span className="text-lg">{currentDate}</span>
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div
          className="glass-card p-6 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-start space-x-3">
            <Sparkles className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
            <blockquote className="text-white/90 text-lg italic leading-relaxed">
              "{state.quote}"
            </blockquote>
          </div>
        </motion.div>

        {/* Current Focus Display */}
        {state.dailyFocus && (
          <motion.div
            className="glass-card p-4 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="text-white/70 text-sm mb-1">Today's Focus</div>
            <div className="text-white text-lg font-medium">
              {state.dailyFocus}
            </div>
          </motion.div>
        )}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -40, -20],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </motion.section>
  )
}