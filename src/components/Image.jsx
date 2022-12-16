import React from 'react'

const imageStyle = {
  width: '50px',
  height: '50px'
}

const image = (props) => {
  return (
    <div>  
        <img src={props.image} alt='not' style={imageStyle}/>
    </div>
  )
}

export default image