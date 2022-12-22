import React from 'react'

const Buttonn = (props) => {
  return (
    <div>
        <button type={props.type} className='buttonn-style' onClick={props.updateChatData}>{props.children}</button>
    </div>
  )
}

export default Buttonn