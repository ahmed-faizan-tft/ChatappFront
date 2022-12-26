import React from 'react'

const Span = (props) => {
  return (
    <small className='span-small'>
        <a href={props.link} className='span-a'>{props.linkName}</a>
    </small>
  )
}

export default Span