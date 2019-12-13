import { useState, useEffect } from 'react'
import axios from 'axios'

export default (themes, themeId, maxRes = 5) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchVideos = async (channelId) => {
      setIsLoading(true)
      try {
        const res = await axios.get(`/api/${channelId}/${maxRes}`)
        setData(d => [...d, res.data])
        setIsLoading(false)
      } catch (err) {
        console.error(err)
        setError(err.message)
        setIsLoading(false)
      }
    }

    if (themes && themeId) {
      const activeThemeIndex = themes.findIndex(t => t.id === themeId)
  
      if (activeThemeIndex === -1) {
        setError('Error: Theme with this id does not exist')
      } else {
        const activeTheme = themes[activeThemeIndex]
        if (activeTheme.channels.length === 0) {
          setError('No videos in feed yet, edit Theme & select channels')
        } else {
          const channelIds = activeTheme.channels.map(c => c.channelId)
          channelIds.map((id) => fetchVideos(id))
        }
      }
    }
  }, [themes, themeId, maxRes])

  return { data, isLoading, error }
}