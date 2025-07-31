'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '@/components/providers/AppProvider'
import { 
  Music, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Radio,
  Headphones
} from 'lucide-react'

interface Track {
  id: string
  title: string
  artist: string
  duration: number
  category: 'lofi' | 'nature'
}

const tracks: Track[] = [
  { id: 'lofi-1', title: 'Midnight Study', artist: 'Lo-Fi Beats', duration: 180, category: 'lofi' },
  { id: 'lofi-2', title: 'Coffee Shop Vibes', artist: 'Chill Hip Hop', duration: 165, category: 'lofi' },
  { id: 'lofi-3', title: 'Rainy Day Focus', artist: 'Study Beats', duration: 200, category: 'lofi' },
  { id: 'lofi-4', title: 'Peaceful Moments', artist: 'Ambient Lofi', duration: 190, category: 'lofi' },
  
  { id: 'nature-1', title: 'Forest Rain', artist: 'Nature Sounds', duration: 300, category: 'nature' },
  { id: 'nature-2', title: 'Ocean Waves', artist: 'Ambient Nature', duration: 280, category: 'nature' },
  { id: 'nature-3', title: 'Mountain Stream', artist: 'Water Sounds', duration: 320, category: 'nature' },
  { id: 'nature-4', title: 'Thunderstorm', artist: 'Rain Sounds', duration: 240, category: 'nature' },
]

export default function MusicPlayer() {
  const { state, dispatch } = useApp()
  const [currentTime, setCurrentTime] = useState(0)
  const [isShuffleOn, setIsShuffleOn] = useState(false)
  const [isRepeatOn, setIsRepeatOn] = useState(false)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const [isDockExpanded, setIsDockExpanded] = useState(false)
  const progressRef = useRef<HTMLDivElement>(null)

  const currentTrack = tracks.find(track => track.id === state.music.currentTrack)
  const playlistTracks = tracks.filter(track => track.category === state.music.playlist)

  // Simulate audio playback
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (state.music.isPlaying && currentTrack) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= currentTrack.duration) {
            handleNext()
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [state.music.isPlaying, currentTrack])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handlePlayPause = () => {
    dispatch({
      type: 'SET_MUSIC',
      payload: { isPlaying: !state.music.isPlaying }
    })
  }

  const handleNext = () => {
    const currentIndex = playlistTracks.findIndex(track => track.id === state.music.currentTrack)
    let nextIndex = isShuffleOn 
      ? Math.floor(Math.random() * playlistTracks.length)
      : (currentIndex + 1) % playlistTracks.length

    dispatch({
      type: 'SET_MUSIC',
      payload: { currentTrack: playlistTracks[nextIndex].id }
    })
    setCurrentTime(0)
  }

  const handlePrevious = () => {
    const currentIndex = playlistTracks.findIndex(track => track.id === state.music.currentTrack)
    const prevIndex = currentIndex === 0 ? playlistTracks.length - 1 : currentIndex - 1

    dispatch({
      type: 'SET_MUSIC',
      payload: { currentTrack: playlistTracks[prevIndex].id }
    })
    setCurrentTime(0)
  }

  const handleVolumeChange = (volume: number) => {
    dispatch({
      type: 'SET_MUSIC',
      payload: { volume: volume / 100 }
    })
  }

  const handlePlaylistChange = (playlist: 'lofi' | 'nature') => {
    const newTracks = tracks.filter(track => track.category === playlist)
    dispatch({
      type: 'SET_MUSIC',
      payload: { 
        playlist,
        currentTrack: newTracks[0].id,
        isPlaying: false
      }
    })
    setCurrentTime(0)
  }

  const handleTrackSelect = (trackId: string) => {
    dispatch({
      type: 'SET_MUSIC',
      payload: { currentTrack: trackId, isPlaying: true }
    })
    setCurrentTime(0)
  }

  const progress = currentTrack ? (currentTime / currentTrack.duration) * 100 : 0

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
          <Music className="w-5 h-5 text-purple-400" />
          <span className="text-white font-medium">Music & Sounds</span>
        </motion.div>
        <h2 className="text-3xl font-bold text-white mb-2">Focus with ambient sounds</h2>
        <p className="text-white/70">Lo-fi beats and nature sounds for productivity</p>
      </div>

      {/* Playlist Selector */}
      <motion.div
        className="flex justify-center mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="glass-card p-2 flex space-x-1">
          {[
            { id: 'lofi', label: 'Lo-Fi Beats', icon: Headphones, color: 'text-purple-400' },
            { id: 'nature', label: 'Nature Sounds', icon: Radio, color: 'text-green-400' },
          ].map((playlist) => (
            <motion.button
              key={playlist.id}
              onClick={() => handlePlaylistChange(playlist.id as 'lofi' | 'nature')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 ${
                state.music.playlist === playlist.id
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <playlist.icon className={`w-4 h-4 ${
                state.music.playlist === playlist.id ? 'text-white' : playlist.color
              }`} />
              <span className="font-medium">{playlist.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Now Playing */}
        <motion.div
          className="glass-card p-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-white font-medium mb-6 flex items-center space-x-2">
            <Music className="w-5 h-5" />
            <span>Now Playing</span>
          </h3>

          {currentTrack && (
            <div className="space-y-6">
              {/* Track Info */}
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center">
                  <Music className="w-16 h-16 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-1">{currentTrack.title}</h4>
                <p className="text-white/60">{currentTrack.artist}</p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-white/60">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(currentTrack.duration)}</span>
                </div>
                <div 
                  ref={progressRef}
                  className="h-2 bg-white/10 rounded-full cursor-pointer"
                  onClick={(e) => {
                    if (progressRef.current) {
                      const rect = progressRef.current.getBoundingClientRect()
                      const x = e.clientX - rect.left
                      const percentage = x / rect.width
                      setCurrentTime(Math.floor(percentage * currentTrack.duration))
                    }
                  }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-4">
                <motion.button
                  onClick={() => setIsShuffleOn(!isShuffleOn)}
                  className={`p-2 rounded-lg transition-colors ${
                    isShuffleOn ? 'text-purple-400' : 'text-white/60 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Shuffle className="w-4 h-4" />
                </motion.button>

                <motion.button
                  onClick={handlePrevious}
                  className="text-white/60 hover:text-white p-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <SkipBack className="w-5 h-5" />
                </motion.button>

                <motion.button
                  onClick={handlePlayPause}
                  className="bg-gradient-to-r from-purple-400 to-pink-400 text-white p-4 rounded-full hover:scale-105 transition-transform"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {state.music.isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </motion.button>

                <motion.button
                  onClick={handleNext}
                  className="text-white/60 hover:text-white p-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <SkipForward className="w-5 h-5" />
                </motion.button>

                <motion.button
                  onClick={() => setIsRepeatOn(!isRepeatOn)}
                  className={`p-2 rounded-lg transition-colors ${
                    isRepeatOn ? 'text-purple-400' : 'text-white/60 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Repeat className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center space-x-3">
                <motion.button
                  onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                  className="text-white/60 hover:text-white"
                  whileHover={{ scale: 1.1 }}
                >
                  {state.music.volume === 0 ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </motion.button>

                <AnimatePresence>
                  {showVolumeSlider && (
                    <motion.div
                      className="flex-1"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                    >
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={state.music.volume * 100}
                        onChange={(e) => handleVolumeChange(Number(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <span className="text-white/60 text-sm min-w-[3rem]">
                  {Math.round(state.music.volume * 100)}%
                </span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Playlist */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-white font-medium mb-4 flex items-center space-x-2">
            <Radio className="w-4 h-4" />
            <span>{state.music.playlist === 'lofi' ? 'Lo-Fi Beats' : 'Nature Sounds'}</span>
          </h3>

          <div className="space-y-2 max-h-80 overflow-y-auto scrollbar-hide">
            {playlistTracks.map((track, index) => (
              <motion.button
                key={track.id}
                onClick={() => handleTrackSelect(track.id)}
                className={`w-full p-3 rounded-xl text-left transition-all duration-200 ${
                  track.id === state.music.currentTrack
                    ? 'bg-gradient-to-r from-purple-400/20 to-pink-400/20 border border-purple-400/30'
                    : 'hover:bg-white/10'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    track.id === state.music.currentTrack && state.music.isPlaying
                      ? 'bg-gradient-to-r from-purple-400 to-pink-400'
                      : 'bg-white/10'
                  }`}>
                    {track.id === state.music.currentTrack && state.music.isPlaying ? (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <Music className="w-4 h-4 text-white" />
                      </motion.div>
                    ) : (
                      <Play className="w-4 h-4 text-white/60" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium truncate">{track.title}</div>
                    <div className="text-white/60 text-sm">{track.artist}</div>
                  </div>

                  <div className="text-white/60 text-sm">
                    {formatTime(track.duration)}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Audio Visualizer */}
      <motion.div
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-white font-medium mb-4 text-center">Audio Visualizer</h3>
        
        <div className="flex items-end justify-center space-x-1 h-24">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="bg-gradient-to-t from-purple-400 to-pink-400 w-3 rounded-t-full"
              animate={{
                height: state.music.isPlaying 
                  ? [Math.random() * 60 + 20, Math.random() * 60 + 20, Math.random() * 60 + 20]
                  : 8
              }}
              transition={{
                duration: 0.5 + Math.random() * 0.5,
                repeat: state.music.isPlaying ? Infinity : 0,
                repeatType: "reverse"
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Floating Music Dock - Fixed Position */}
      <AnimatePresence>
        {state.music.isPlaying && (
          <motion.div
            className="fixed bottom-6 right-6 z-40"
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className={`floating-dock rounded-2xl transition-all duration-300 ${
                isDockExpanded ? 'p-4 w-80' : 'p-3 w-auto'
              }`}
              whileHover={{ scale: 1.02 }}
            >
              {isDockExpanded ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                      <Music className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-medium truncate text-sm">
                        {currentTrack?.title}
                      </div>
                      <div className="text-white/60 text-xs">
                        {currentTrack?.artist}
                      </div>
                    </div>
                    <motion.button
                      onClick={() => setIsDockExpanded(false)}
                      className="text-white/60 hover:text-white"
                      whileHover={{ scale: 1.1 }}
                    >
                      <VolumeX className="w-4 h-4" />
                    </motion.button>
                  </div>

                  <div className="flex items-center justify-center space-x-2">
                    <motion.button
                      onClick={handlePrevious}
                      className="text-white/60 hover:text-white p-1"
                      whileHover={{ scale: 1.1 }}
                    >
                      <SkipBack className="w-4 h-4" />
                    </motion.button>

                    <motion.button
                      onClick={handlePlayPause}
                      className="bg-gradient-to-r from-purple-400 to-pink-400 text-white p-2 rounded-full"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {state.music.isPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </motion.button>

                    <motion.button
                      onClick={handleNext}
                      className="text-white/60 hover:text-white p-1"
                      whileHover={{ scale: 1.1 }}
                    >
                      <SkipForward className="w-4 h-4" />
                    </motion.button>
                  </div>

                  <div className="h-1 bg-white/10 rounded-full">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <motion.button
                  onClick={() => setIsDockExpanded(true)}
                  className="flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: state.music.isPlaying ? 360 : 0 }}
                      transition={{ duration: 2, repeat: state.music.isPlaying ? Infinity : 0, ease: "linear" }}
                    >
                      <Music className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>
                  <div className="text-white text-sm font-medium">
                    {currentTrack?.title}
                  </div>
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgb(168, 85, 247), rgb(236, 72, 153));
          cursor: pointer;
          border: none;
        }
        
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgb(168, 85, 247), rgb(236, 72, 153));
          cursor: pointer;
          border: none;
        }
      `}</style>
    </motion.div>
  )
}