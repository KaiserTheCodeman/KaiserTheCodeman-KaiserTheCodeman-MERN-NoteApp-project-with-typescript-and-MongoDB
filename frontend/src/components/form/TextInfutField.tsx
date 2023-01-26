import React from 'react'
import { Form } from 'react-bootstrap'
import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form'


export interface TextInfutFieldPros {
    name: string,
    label: string,
    register: UseFormRegister<any>,
    registerOptions?: RegisterOptions,
    error?: FieldError,
    [x:string]: any,

}



const TextInfutField = ({ name, label, register, registerOptions, error, ...props }: TextInfutFieldPros) => {
  return (
    <Form.Group className='mb-3 ' controlId={name + "-input"} >
        <Form.Label>
            {label}
        </Form.Label>
        <Form.Control {...props} {...register(name, registerOptions)} isInvalid={!!error}  />
        <Form.Control.Feedback type='invalid' >
            {error?.message}
        </Form.Control.Feedback>
    </Form.Group>
  )
}

export default TextInfutField