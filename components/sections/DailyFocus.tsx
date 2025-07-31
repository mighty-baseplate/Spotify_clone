'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '@/components/providers/AppProvider'
import { Target, Send, Check } from 'lucide-react'

export default function DailyFocus() {
  const { state, dispatch } = useApp()
  const [inputValue, setInputValue] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      dispatch({ type: 'SET_DAILY_FOCUS', payload: inputValue.trim() })
      setInputValue('')
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)
    }
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-4"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Target className="w-5 h-5 text-blue-400" />
          <span className="text-white font-medium">Daily Focus</span>
        </motion.div>
        <h2 className="text-3xl font-bold text-white mb-2">What's your main focus today?</h2>
        <p className="text-white/70">Set your intention and make it happen</p>
      </div>

      {/* Focus Input */}
      <motion.div
        className="glass-card p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="e.g., Complete the design mockups for the new project"
              className="w-full glass-input px-6 py-4 text-white placeholder-white/50 text-lg focus:outline-none"
              maxLength={100}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/30 text-sm">
              {inputValue.length}/100
            </div>
          </div>

          <motion.button
            type="submit"
            className="w-full glass-button px-6 py-4 text-white font-medium text-lg flex items-center justify-center space-x-2 hover:bg-white/30 transition-all duration-200 ripple-effect"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            disabled={!inputValue.trim()}
          >
            {showSuccess ? (
              <>
                <Check className="w-5 h-5 text-green-400" />
                <span>Focus Set!</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Set Daily Focus</span>
              </>
            )}
          </motion.button>
        </form>
      </motion.div>

      {/* Current Focus Display */}
      {state.dailyFocus && (
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2"></div>
            <div>
              <h3 className="text-white font-medium mb-1">Current Focus</h3>
              <p className="text-white/80 text-lg leading-relaxed">{state.dailyFocus}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Focus Tips */}
      <motion.div
        className="grid md:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {[
          {
            title: 'Be Specific',
            description: 'Clear goals lead to clear results',
            icon: '🎯'
          },
          {
            title: 'Stay Realistic',
            description: 'Choose something achievable today',
            icon: '⚡'
          },
          {
            title: 'Take Action',
            description: 'Break it down into smaller steps',
            icon: '🚀'
          }
        ].map((tip, index) => (
          <motion.div
            key={tip.title}
            className="glass-card p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-2xl mb-2">{tip.icon}</div>
            <h4 className="text-white font-medium mb-1">{tip.title}</h4>
            <p className="text-white/60 text-sm">{tip.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}