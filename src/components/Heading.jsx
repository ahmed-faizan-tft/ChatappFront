import React from 'react'

const Heading = (props) => {
  return (
    <h3 className='login-heading'>
        {props.headingName}
    </h3>
  )
}

export default Heading