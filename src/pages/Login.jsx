import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, FormInput, Grid, Header, Message, Segment } from 'semantic-ui-react'
import * as userService from '../services/userService.jsx'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(false)
    const navigate = useNavigate()

    const handleLogin = () => {
        userService.Login({ email, password }).then(res => {
            localStorage.setItem("accessToken", data.accessToken)
        }).catch(e => {
            console.error(e)
            if (e.status == 401)
                alert("wrong passwork")
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

    const isFormValid = email && password && !emailError

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    Log-in to your account
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <FormInput
                            fluid
                            icon='user'
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
                            onClick={handleLogin}
                            disabled={!isFormValid}
                        >
                            Login
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    New to us? <a onClick={() => navigate('/signup')}>Sign Up</a>
                </Message>
            </Grid.Column>
        </Grid>
    )
}

export default Login
