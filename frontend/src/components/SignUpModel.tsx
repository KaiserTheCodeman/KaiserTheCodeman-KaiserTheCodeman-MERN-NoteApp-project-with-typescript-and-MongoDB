
import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import { User } from '../models/user'
import { SignUpCredentials } from '../network/notes_api'
import * as NotesApi from '../network/notes_api'
import { Alert, Button, Form, Modal } from 'react-bootstrap'
import TextInfutField from './form/TextInfutField'
import styles from '../styles/utils.module.css'
import { conflictError } from '../errors/http_errors'


export interface SignUpModelProps {
    onDismiss : () => void,
    onSignUpSuccessful : (user : User) => void,
}



const SignUpModel = ({ onDismiss, onSignUpSuccessful } : SignUpModelProps) => {

    const [errorText, setErrorText] = useState<string | null>(null)

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpCredentials>()

    async function onSubmit(credentials: SignUpCredentials) {
        try {
            const newUser = await NotesApi.signUp(credentials)
            onSignUpSuccessful(newUser)

        } catch (error) {
            if(error instanceof conflictError) {
                setErrorText(error.message)
            } else {
                alert(error)

            }
            console.error(error)
        }
    }



  return (
    <Modal show onHide={onDismiss} >
        <Modal.Header closeButton >
            <Modal.Title  >
                Sign Up
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            {
                errorText && 
                <Alert variant='danger' >
                    {errorText}
                </Alert>
            }
            <Form onSubmit={handleSubmit(onSubmit)} >
                <TextInfutField
                  name="username"
                   label="Username"
                    type="text"
                     register={register}
                      registerOptions={{required: "Required"}}
                      error={errors.username}
                      placeholder="Username"  />
                <TextInfutField
                  name="email"
                   label="Email"
                    type="email"
                     register={register}
                      registerOptions={{required: "Required"}}
                      error={errors.email}
                      placeholder="Email"  />
                <TextInfutField
                  name="password"
                   label="Password"
                    type="password"
                     register={register}
                      registerOptions={{required: "Required"}}
                      error={errors.password}
                      placeholder="Password"  />
                <Button type='submit' disabled={isSubmitting} className={styles.width100} >
                    Sign Up   
                </Button>      

            </Form>
        </Modal.Body>
    </Modal>
  )
}

export default SignUpModel