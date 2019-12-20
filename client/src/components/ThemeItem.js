import React from 'react'

const ThemeItem = ({ theme }) => {
  return (
    <>
      <h3>{theme.name}</h3>
      <span>
        {
          theme.channels && theme.channels.length === 0 
            ? `No channels`
            : theme.channels.length === 1
              ? `${theme.channels.length } channel` 
              : `${theme.channels.length } channels` 
        }
      </span>
    </>
  )
}

export default ThemeItem