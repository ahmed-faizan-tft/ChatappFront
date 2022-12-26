import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

const Input = (props) => {
  return (
    <div className='login-input'>
        <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">{props.children}</InputGroup.Text>
        <Form.Control
          placeholder={props.placeHolder}
          type={props.type}
          aria-label={props.placeHolder}
          aria-describedby="basic-addon1"
          onChange={props.onChange}
          onKeyDown={props.onEnterKeyPress}
        />
      </InputGroup>
    </div>
  )
}

export default Input