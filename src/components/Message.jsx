import React from 'react'

const Message = (props) => {
  return (
    <div style={{display:"flex", marginLeft:`${props.side}`}}>
        <small style={{display:'block', color:'grey', paddingTop:'8px'}}>{props.time}</small>
        <div className='message-box' style={{backgroundColor:`${props.color}`}}>{props.message}</div>
    </div>
  )
}

export default Message