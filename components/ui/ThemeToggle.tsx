'use client'

import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="glass-button p-3 w-12 h-12 flex items-center justify-center">
        <div className="w-5 h-5 bg-white/30 rounded-full animate-pulse" />
      </div>
    )
  }

  const isDark = theme === 'dark'

  return (
    <motion.button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="glass-button p-3 hover:scale-105 active:scale-95 transition-all duration-200 relative overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="relative z-10"
        initial={false}
        animate={{ 
          rotate: isDark ? 180 : 0,
          scale: isDark ? 0.8 : 1
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {isDark ? (
          <Moon className="w-5 h-5 text-blue-200" />
        ) : (
          <Sun className="w-5 h-5 text-yellow-300" />
        )}
      </motion.div>
      
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        initial={false}
        animate={{
          background: isDark 
            ? 'linear-gradient(135deg, rgba(30, 60, 114, 0.3) 0%, rgba(42, 82, 152, 0.3) 100%)'
            : 'linear-gradient(135deg, rgba(255, 154, 158, 0.3) 0%, rgba(250, 208, 196, 0.3) 100%)'
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  )
}