'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '@/components/providers/AppProvider'
import { 
  Heart, 
  Calculator, 
  TrendingUp, 
  Activity,
  Target
} from 'lucide-react'

export default function BMICalculator() {
  const { state, dispatch } = useApp()
  const [height, setHeight] = useState(state.bmi.height || '')
  const [weight, setWeight] = useState(state.bmi.weight || '')
  const [showResult, setShowResult] = useState(false)

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    if (height && weight) {
      dispatch({
        type: 'UPDATE_BMI',
        payload: {
          height: Number(height),
          weight: Number(weight)
        }
      })
      setShowResult(true)
    }
  }

  const getBMIColor = (bmi?: number) => {
    if (!bmi) return 'text-white'
    if (bmi < 18.5) return 'text-blue-400'
    if (bmi < 25) return 'text-green-400'
    if (bmi < 30) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getBMIGradient = (category?: string) => {
    switch (category) {
      case 'Underweight':
        return 'from-blue-400 to-cyan-400'
      case 'Normal':
        return 'from-green-400 to-emerald-400'
      case 'Overweight':
        return 'from-yellow-400 to-orange-400'
      case 'Obese':
        return 'from-red-400 to-pink-400'
      default:
        return 'from-gray-400 to-gray-500'
    }
  }

  const healthTips = [
    {
      category: 'Underweight',
      tips: [
        'Eat more frequent, smaller meals',
        'Add healthy fats to your diet',
        'Include protein-rich foods',
        'Consult a nutritionist'
      ]
    },
    {
      category: 'Normal',
      tips: [
        'Maintain your current lifestyle',
        'Stay active with regular exercise',
        'Eat a balanced diet',
        'Monitor your weight regularly'
      ]
    },
    {
      category: 'Overweight',
      tips: [
        'Increase physical activity',
        'Reduce portion sizes',
        'Choose whole foods',
        'Stay hydrated'
      ]
    },
    {
      category: 'Obese',
      tips: [
        'Consult a healthcare provider',
        'Start with light exercise',
        'Focus on nutrition',
        'Set realistic goals'
      ]
    }
  ]

  const currentTips = healthTips.find(tip => tip.category === state.bmi.category)?.tips || []

  return (
    <motion.div
      className="max-w-6xl mx-auto space-y-6"
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
          <Heart className="w-5 h-5 text-red-400" />
          <span className="text-white font-medium">Wellness Tracker</span>
        </motion.div>
        <h2 className="text-3xl font-bold text-white mb-2">BMI Calculator</h2>
        <p className="text-white/70">Track your health and wellness goals</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Calculator */}
        <motion.div
          className="glass-card p-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-white font-medium mb-6 flex items-center space-x-2">
            <Calculator className="w-5 h-5" />
            <span>Calculate Your BMI</span>
          </h3>

          <form onSubmit={handleCalculate} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Height Input */}
              <div>
                <label className="block text-white/70 text-sm mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="175"
                  min="100"
                  max="250"
                  className="w-full glass-input px-4 py-3 text-white placeholder-white/50 focus:outline-none"
                  required
                />
              </div>

              {/* Weight Input */}
              <div>
                <label className="block text-white/70 text-sm mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="70"
                  min="30"
                  max="300"
                  step="0.1"
                  className="w-full glass-input px-4 py-3 text-white placeholder-white/50 focus:outline-none"
                  required
                />
              </div>
            </div>

            <motion.button
              type="submit"
              className="w-full glass-button px-6 py-4 text-white font-medium text-lg flex items-center justify-center space-x-2 hover:bg-white/30 transition-all duration-200"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Calculator className="w-5 h-5" />
              <span>Calculate BMI</span>
            </motion.button>
          </form>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* BMI Ranges */}
          <div className="glass-card p-6">
            <h3 className="text-white font-medium mb-4 flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>BMI Ranges</span>
            </h3>
            
            <div className="space-y-3">
              {[
                { range: 'Below 18.5', category: 'Underweight', color: 'text-blue-400' },
                { range: '18.5 - 24.9', category: 'Normal', color: 'text-green-400' },
                { range: '25.0 - 29.9', category: 'Overweight', color: 'text-yellow-400' },
                { range: '30.0+', category: 'Obese', color: 'text-red-400' },
              ].map((item) => (
                <div key={item.category} className="flex justify-between items-center">
                  <span className="text-white/70">{item.range}</span>
                  <span className={`font-medium ${item.color}`}>{item.category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Health Metrics */}
          <div className="glass-card p-6">
            <h3 className="text-white font-medium mb-4 flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>Health Metrics</span>
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Target BMI</span>
                <span className="text-green-400 font-medium">18.5 - 24.9</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Ideal Weight</span>
                <span className="text-blue-400 font-medium">
                  {height ? `${Math.round(18.5 * (Number(height) / 100) ** 2)} - ${Math.round(24.9 * (Number(height) / 100) ** 2)} kg` : '-- kg'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Current BMI</span>
                <span className={`font-medium ${getBMIColor(state.bmi.result)}`}>
                  {state.bmi.result || '--'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Results */}
      <AnimatePresence>
        {showResult && state.bmi.result && state.bmi.category && (
          <motion.div
            className="glass-card p-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <motion.div
                className="inline-flex items-center space-x-3 mb-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Target className="w-6 h-6 text-white" />
                <h3 className="text-2xl font-bold text-white">Your BMI Result</h3>
              </motion.div>

              <motion.div
                className="relative mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className={`text-6xl font-bold mb-2 bg-gradient-to-r ${getBMIGradient(state.bmi.category)} bg-clip-text text-transparent`}>
                  {state.bmi.result}
                </div>
                <div className={`text-xl font-medium ${getBMIColor(state.bmi.result)}`}>
                  {state.bmi.category}
                </div>
              </motion.div>

              {/* Progress Bar */}
              <motion.div
                className="relative h-4 bg-white/10 rounded-full overflow-hidden mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  className={`h-full bg-gradient-to-r ${getBMIGradient(state.bmi.category)} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((state.bmi.result! / 35) * 100, 100)}%` }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                />
                <div className="absolute inset-0 flex justify-between items-center px-2 text-xs text-white/60">
                  <span>15</span>
                  <span>25</span>
                  <span>35</span>
                </div>
              </motion.div>
            </div>

            {/* Health Tips */}
            {currentTips.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h4 className="text-white font-medium mb-4 flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span>Health Recommendations</span>
                </h4>
                
                <div className="grid md:grid-cols-2 gap-3">
                  {currentTips.map((tip, index) => (
                    <motion.div
                      key={index}
                      className="glass-card p-4 flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex-shrink-0" />
                      <span className="text-white/80 text-sm">{tip}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Action Button */}
            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                onClick={() => setShowResult(false)}
                className="glass-button px-6 py-3 text-white font-medium hover:bg-white/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Calculate Again
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Health Goals */}
      <motion.div
        className="grid md:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {[
          {
            title: 'Track Progress',
            description: 'Monitor your BMI changes over time',
            icon: '📊',
            color: 'from-blue-400 to-cyan-400'
          },
          {
            title: 'Set Goals',
            description: 'Define your target weight range',
            icon: '🎯',
            color: 'from-green-400 to-emerald-400'
          },
          {
            title: 'Stay Healthy',
            description: 'Maintain a balanced lifestyle',
            icon: '💪',
            color: 'from-purple-400 to-pink-400'
          }
        ].map((goal, index) => (
          <motion.div
            key={goal.title}
            className="glass-card p-6 text-center group hover:scale-105 transition-transform duration-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <div className="text-3xl mb-3">{goal.icon}</div>
            <h4 className="text-white font-medium mb-2">{goal.title}</h4>
            <p className="text-white/60 text-sm">{goal.description}</p>
            <div className={`h-1 bg-gradient-to-r ${goal.color} rounded-full mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}