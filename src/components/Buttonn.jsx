import React from 'react'

const buttonStyle = {
  
}

const Button = (props) => {
  return (
    <div>
        <button type={props.type} className='buttonn-style' onClick={props.updateChatData}>{props.children}</button>
    </div>
  )
}

export default Button