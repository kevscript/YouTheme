import React from 'react'
import styled from 'styled-components'
import Select from 'react-select'

const StyledSelect = styled(Select)`
  flex: 1; 
`

const SelectorButton = styled.button`
  cursor: pointer;
  padding: 9px 20px;
  margin: 0 0 0 10px;
  font-size: 15px;
  background: #0c2461;
  height: 40px;
  color: #f1f1f1;
  font-weight: 500;
  border: 0;
  border-radius: 5px;

  :disabled {
    cursor: auto;
    background: #ccc;
    color: #666;
  }
`

const ChannelSelector = ({ options, handleChange, handleAdd, isValidInput }) => {
  return (
    <>
      <StyledSelect 
        options={options} 
        onChange={handleChange}
        isClearable={true}
        isSearchable={true}
        isDisabled={false}
        isLoading={false}
        isRtl={false}
      />
      <SelectorButton 
        onClick={handleAdd} 
        disabled={isValidInput() ? false : true}
      >
        Add
      </SelectorButton>
    </>
  )
}

export default ChannelSelector