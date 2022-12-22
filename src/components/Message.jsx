import React from 'react'

const Message = (props) => {
  return (
      <div className={props.messageBox}>
          <small className='message-small'>{props.time}</small>
          {
            props.isFile ?
            <div onClick={props.downloadFile} className={`message-box ${props.messageBoxColor}`} >Click to download</div>
            :
            <div className={`message-box ${props.messageBoxColor}`} >{props.message}</div>
            
          }
          
      </div>
  )
}

export default Message