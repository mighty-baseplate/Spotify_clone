'use client'

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react'

// Types
export interface Task {
  id: string
  title: string
  completed: boolean
  category: 'inbox' | 'today' | 'done'
  createdAt: number
  priority?: 'low' | 'medium' | 'high'
}

export interface AppState {
  dailyFocus: string
  tasks: Task[]
  currentTimer: {
    isActive: boolean
    isPaused: boolean
    timeLeft: number
    isBreak: boolean
    type: 'pomodoro' | 'custom'
  }
  bmi: {
    height: number
    weight: number
    result?: number
    category?: string
  }
  music: {
    isPlaying: boolean
    currentTrack: string
    volume: number
    playlist: 'lofi' | 'nature'
  }
  quote: string
  greeting: string
  backgroundImage: string
}

type AppAction = 
  | { type: 'SET_DAILY_FOCUS'; payload: string }
  | { type: 'ADD_TASK'; payload: Omit<Task, 'id' | 'createdAt'> }
  | { type: 'UPDATE_TASK'; payload: { id: string; updates: Partial<Task> } }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'START_TIMER'; payload: { duration: number; type: 'pomodoro' | 'custom' } }
  | { type: 'PAUSE_TIMER' }
  | { type: 'RESET_TIMER' }
  | { type: 'TICK_TIMER' }
  | { type: 'UPDATE_BMI'; payload: { height: number; weight: number } }
  | { type: 'SET_MUSIC'; payload: Partial<AppState['music']> }
  | { type: 'LOAD_FROM_STORAGE'; payload: Partial<AppState> }

// Default state
const initialState: AppState = {
  dailyFocus: '',
  tasks: [],
  currentTimer: {
    isActive: false,
    isPaused: false,
    timeLeft: 25 * 60, // 25 minutes in seconds
    isBreak: false,
    type: 'pomodoro'
  },
  bmi: {
    height: 0,
    weight: 0
  },
  music: {
    isPlaying: false,
    currentTrack: 'lofi-1',
    volume: 0.7,
    playlist: 'lofi'
  },
  quote: 'The way to get started is to quit talking and begin doing.',
  greeting: 'Good morning',
  backgroundImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
}

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_DAILY_FOCUS':
      return { ...state, dailyFocus: action.payload }
    
    case 'ADD_TASK':
      const newTask: Task = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: Date.now()
      }
      return { ...state, tasks: [...state.tasks, newTask] }
    
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updates }
            : task
        )
      }
    
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      }
    
    case 'START_TIMER':
      return {
        ...state,
        currentTimer: {
          ...state.currentTimer,
          isActive: true,
          isPaused: false,
          timeLeft: action.payload.duration,
          type: action.payload.type
        }
      }
    
    case 'PAUSE_TIMER':
      return {
        ...state,
        currentTimer: {
          ...state.currentTimer,
          isPaused: !state.currentTimer.isPaused
        }
      }
    
    case 'RESET_TIMER':
      return {
        ...state,
        currentTimer: {
          ...state.currentTimer,
          isActive: false,
          isPaused: false,
          timeLeft: state.currentTimer.type === 'pomodoro' ? 25 * 60 : 30 * 60,
          isBreak: false
        }
      }
    
    case 'TICK_TIMER':
      if (state.currentTimer.timeLeft <= 1) {
        return {
          ...state,
          currentTimer: {
            ...state.currentTimer,
            isActive: false,
            timeLeft: 0,
            isBreak: !state.currentTimer.isBreak
          }
        }
      }
      return {
        ...state,
        currentTimer: {
          ...state.currentTimer,
          timeLeft: state.currentTimer.timeLeft - 1
        }
      }
    
    case 'UPDATE_BMI':
      const { height, weight } = action.payload
      const bmiValue = weight / ((height / 100) ** 2)
      let category = ''
      if (bmiValue < 18.5) category = 'Underweight'
      else if (bmiValue < 25) category = 'Normal'
      else if (bmiValue < 30) category = 'Overweight'
      else category = 'Obese'
      
      return {
        ...state,
        bmi: {
          height,
          weight,
          result: Math.round(bmiValue * 10) / 10,
          category
        }
      }
    
    case 'SET_MUSIC':
      return {
        ...state,
        music: { ...state.music, ...action.payload }
      }
    
    case 'LOAD_FROM_STORAGE':
      return { ...state, ...action.payload }
    
    default:
      return state
  }
}

// Context
const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

// Provider
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('productivity-toolkit-state')
    if (saved) {
      try {
        const parsedState = JSON.parse(saved)
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: parsedState })
      } catch (error) {
        console.error('Failed to load state from localStorage:', error)
      }
    }
  }, [])

  // Save to localStorage on state changes
  useEffect(() => {
    const stateToSave = {
      dailyFocus: state.dailyFocus,
      tasks: state.tasks,
      bmi: state.bmi,
      music: state.music
    }
    localStorage.setItem('productivity-toolkit-state', JSON.stringify(stateToSave))
  }, [state.dailyFocus, state.tasks, state.bmi, state.music])

  // Update greeting based on time
  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours()
      let newGreeting = 'Good morning'
      if (hour >= 12 && hour < 17) newGreeting = 'Good afternoon'
      else if (hour >= 17) newGreeting = 'Good evening'
      
      if (state.greeting !== newGreeting) {
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: { greeting: newGreeting } })
      }
    }
    
    updateGreeting()
    const interval = setInterval(updateGreeting, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [state.greeting])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

// Hook
export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}