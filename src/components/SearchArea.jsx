import React from 'react'

const SearchArea = (props) => {
  return (
    <div className='searcharea-div'>
        <input type="text" 
        placeholder='Type message here...' 
        className='searcharea-input'
        value={props.message}
        onChange={(event)=>{
          props.updateNewMessage(event.target.value);
        }}
        onKeyDown={props.onEnterKeyPress}/>
    </div>

  )
}

export default SearchArea