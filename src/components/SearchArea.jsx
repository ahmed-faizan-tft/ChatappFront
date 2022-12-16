import React from 'react'

const SearchArea = (props) => {
  return (
    <div style={{  width: '75%',height: '100%'}}>
        <input type="text" 
        placeholder='Type message here...' 
        style={props.styleSearch} 
        value={props.message}
        onChange={(event)=>{
          props.updateNewMessage(event.target.value);
        }}/>
    </div>

  )
}

export default SearchArea