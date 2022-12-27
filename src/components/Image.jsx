import React from 'react'

const image = (props) => {
  return (
    <div>  
        <img src={props.image} alt='not' className='image-Style'/>
    </div>
  )
}

export default image