import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
  padding: 10px;
  flex: 1;
  font-size: 15px;
  height: 40px;
  border-radius: 3px 0 0 3px;
  border: 1px solid rgba(24,174,138,1);
  border-right: none;
  background: #f1f1f1;
  z-index: 99;
`

const InputButton = styled.button`
  cursor: pointer;
  padding: 0 20px;
  font-size: 15px;
  background: #0c2461;
  height: 40px;
  color: #f1f1f1;
  border: 1px solid rgba(12,35,87,1);
  border-radius: 0 3px 3px 0;
  font-weight: 500;

  :disabled {
    cursor: auto;
    background: #ccc;
    color: #666;
    border: 1px solid rgba(24,174,138,1);
  }
`

const ThemeInput = ({ themeInput, handleInput, handleThemeCreation }) => {
  return (
    <>
      <Input
        type="text"
        value={themeInput}
        onChange={e => handleInput(e.target.value)}
        placeholder="New Theme Name"
      />
      <InputButton
        onClick={() => handleThemeCreation(themeInput)}
        disabled={themeInput ? false : true}
      >
        Create
      </InputButton>
    </>
  )
}

export default ThemeInput