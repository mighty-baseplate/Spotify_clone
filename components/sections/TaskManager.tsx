'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp, Task } from '@/components/providers/AppProvider'
import { 
  CheckSquare, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X,
  Inbox,
  Calendar,
  CheckCircle2
} from 'lucide-react'

type TaskCategory = 'inbox' | 'today' | 'done'

export default function TaskManager() {
  const { state, dispatch } = useApp()
  const [activeCategory, setActiveCategory] = useState<TaskCategory>('inbox')
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [editingTask, setEditingTask] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')

  const categories = [
    { id: 'inbox' as TaskCategory, label: 'Inbox', icon: Inbox, color: 'text-blue-400' },
    { id: 'today' as TaskCategory, label: 'Today', icon: Calendar, color: 'text-orange-400' },
    { id: 'done' as TaskCategory, label: 'Done', icon: CheckCircle2, color: 'text-green-400' },
  ]

  const filteredTasks = state.tasks.filter(task => {
    if (activeCategory === 'done') {
      return task.completed
    }
    return task.category === activeCategory && !task.completed
  })

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTaskTitle.trim()) {
      dispatch({
        type: 'ADD_TASK',
        payload: {
          title: newTaskTitle.trim(),
          completed: false,
          category: activeCategory === 'done' ? 'inbox' : activeCategory,
        }
      })
      setNewTaskTitle('')
    }
  }

  const handleToggleTask = (taskId: string) => {
    const task = state.tasks.find(t => t.id === taskId)
    if (task) {
      dispatch({
        type: 'UPDATE_TASK',
        payload: {
          id: taskId,
          updates: { 
            completed: !task.completed,
            category: !task.completed ? 'done' : task.category
          }
        }
      })
    }
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task.id)
    setEditValue(task.title)
  }

  const handleSaveEdit = () => {
    if (editingTask && editValue.trim()) {
      dispatch({
        type: 'UPDATE_TASK',
        payload: {
          id: editingTask,
          updates: { title: editValue.trim() }
        }
      })
    }
    setEditingTask(null)
    setEditValue('')
  }

  const handleCancelEdit = () => {
    setEditingTask(null)
    setEditValue('')
  }

  const handleDeleteTask = (taskId: string) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId })
  }

  const handleMoveTask = (taskId: string, newCategory: TaskCategory) => {
    dispatch({
      type: 'UPDATE_TASK',
      payload: {
        id: taskId,
        updates: { category: newCategory }
      }
    })
  }

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
          <CheckSquare className="w-5 h-5 text-green-400" />
          <span className="text-white font-medium">Task Manager</span>
        </motion.div>
        <h2 className="text-3xl font-bold text-white mb-2">Organize your workflow</h2>
        <p className="text-white/70">Stay focused and get things done</p>
      </div>

      {/* Category Tabs */}
      <motion.div
        className="flex justify-center mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="glass-card p-2 flex space-x-1">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <category.icon className={`w-4 h-4 ${
                activeCategory === category.id ? 'text-white' : category.color
              }`} />
              <span className="font-medium">{category.label}</span>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                {category.id === 'done' 
                  ? state.tasks.filter(t => t.completed).length
                  : state.tasks.filter(t => t.category === category.id && !t.completed).length
                }
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Add Task Form */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-white font-medium mb-4 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add New Task</span>
          </h3>
          
          <form onSubmit={handleAddTask} className="space-y-4">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Enter task description..."
              className="w-full glass-input px-4 py-3 text-white placeholder-white/50 focus:outline-none"
              maxLength={100}
            />
            
            <motion.button
              type="submit"
              className="w-full glass-button px-4 py-3 text-white font-medium flex items-center justify-center space-x-2 hover:bg-white/30 transition-all duration-200"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={!newTaskTitle.trim()}
            >
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </motion.button>
          </form>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-white font-medium mb-4">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/70">Total Tasks</span>
              <span className="text-white font-medium">{state.tasks.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Completed</span>
              <span className="text-green-400 font-medium">
                {state.tasks.filter(t => t.completed).length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Remaining</span>
              <span className="text-orange-400 font-medium">
                {state.tasks.filter(t => !t.completed).length}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Task List */}
      <motion.div
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-medium flex items-center space-x-2">
            {categories.find(c => c.id === activeCategory)?.icon && (
              <categories.find(c => c.id === activeCategory)!.icon className={`w-4 h-4 ${categories.find(c => c.id === activeCategory)!.color}`} />
            )}
            <span>{categories.find(c => c.id === activeCategory)?.label} Tasks</span>
          </h3>
          <span className="text-white/60 text-sm">{filteredTasks.length} tasks</span>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto scrollbar-hide">
          <AnimatePresence>
            {filteredTasks.map((task, index) => (
              <motion.div
                key={task.id}
                className="glass-card p-4 group hover:bg-white/10 transition-all duration-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.1 }}
                layout
              >
                <div className="flex items-center space-x-3">
                  {/* Checkbox */}
                  <motion.button
                    onClick={() => handleToggleTask(task.id)}
                    className={`flex-shrink-0 w-5 h-5 rounded border-2 transition-all duration-200 ${
                      task.completed
                        ? 'bg-green-400 border-green-400 text-white'
                        : 'border-white/30 hover:border-white/50'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {task.completed && <Check className="w-3 h-3" />}
                  </motion.button>

                  {/* Task Content */}
                  <div className="flex-1">
                    {editingTask === task.id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="flex-1 glass-input px-3 py-1 text-white placeholder-white/50 text-sm focus:outline-none"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveEdit()
                            if (e.key === 'Escape') handleCancelEdit()
                          }}
                          autoFocus
                        />
                        <motion.button
                          onClick={handleSaveEdit}
                          className="text-green-400 hover:text-green-300"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Check className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          onClick={handleCancelEdit}
                          className="text-red-400 hover:text-red-300"
                          whileHover={{ scale: 1.1 }}
                        >
                          <X className="w-4 h-4" />
                        </motion.button>
                      </div>
                    ) : (
                      <span className={`text-white transition-all duration-200 ${
                        task.completed ? 'line-through opacity-60' : ''
                      }`}>
                        {task.title}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  {editingTask !== task.id && (
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <motion.button
                        onClick={() => handleEditTask(task)}
                        className="text-blue-400 hover:text-blue-300 p-1"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Edit3 className="w-3 h-3" />
                      </motion.button>
                      <motion.button
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-red-400 hover:text-red-300 p-1"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredTasks.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-white/40 text-lg mb-2">No tasks yet</div>
              <p className="text-white/30 text-sm">
                {activeCategory === 'done' 
                  ? 'Complete some tasks to see them here'
                  : 'Add your first task to get started'
                }
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}