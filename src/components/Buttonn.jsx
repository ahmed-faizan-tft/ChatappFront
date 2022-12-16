import React from 'react'

const buttonStyle = {
  height:"60%",
  border:'none',
  borderRadius:'10px',
  marginLeft: "5px"
}

const Button = (props) => {
  return (
    <div>
        <button type={props.type} style={{...buttonStyle}} onClick={props.updateChatData}>{props.children}</button>
    </div>
  )
}

export default Button