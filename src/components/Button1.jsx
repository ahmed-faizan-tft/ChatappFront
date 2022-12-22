import React from 'react'
import Button from 'react-bootstrap/Button';

const Button1 = (props) => {
  return (
    <div className={`d-grid gap-2 ${props.buttonStyle}`}>
        <Button href={props.link} variant={props.backgroundColor} size="sm" onClick={props.onClick}>
          {props.children} {props.name}
        </Button>
    </div>
  )
}

export default Button1