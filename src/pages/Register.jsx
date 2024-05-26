import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, FormInput, Grid, Header, Message, Segment } from 'semantic-ui-react'
import * as userService from '../services/userService.jsx'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import * as actions from '../store/action.jsx'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleRegister = () => {
        userService.Register({ name, email, password }).then(res => {
            console.log("res.data", res.data)
            localStorage.setItem("accessToken", res.data.accessToken)
            const token = userService.getTokenData()
            userService.getUser(token.userId).then(res => {
                dispatch({ type: actions.SETUSER, data: res.data })
                Swal.fire({
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                    title: `Welcome ${res.data.name}!!!`,
                    position: 'bottom-right'
                })
                navigate('/home')
            }).catch(e => console.error("ERROR: ", e.message))
        }).catch(e => {
            if (e.status === 409)
                Swal.fire({
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2000,
                    text: e.message
                })
            else console.error(e)
        })
    }

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return re.test(email)
    }

    const handleEmailChange = (e) => {
        const email = e.target.value
        setEmail(email)
        setEmailError(!validateEmail(email))
    }

    const isFormValid = name && email && password && !emailError

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    Register for a new account
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <FormInput
                            fluid
                            icon='user'
                            iconPosition='left'
                            placeholder='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <FormInput
                            fluid
                            icon='mail'
                            iconPosition='left'
                            placeholder='E-mail address'
                            value={email}
                            onChange={handleEmailChange}
                            error={emailError ? { content: 'Please enter a valid email address' } : null}
                        />
                        <FormInput
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button
                            color='teal'
                            fluid
                            size='large'
                            onClick={handleRegister}
                            disabled={!isFormValid}
                        >
                            Register
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    Already have an account? <a onClick={() => navigate('/login')}>Login</a>
                </Message>
            </Grid.Column>
        </Grid>
    )
}

export default Register
