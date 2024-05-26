import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, FormInput, Grid, Header, Segment, Message } from 'semantic-ui-react'
import * as linkService from '../services/linkService.jsx'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../store/action.jsx'
const AddLink = () => {
    const [originalURL, setOriginalURL] = useState('');
    const [targetName, setTargetName] = useState('');
    const [urlError, setUrlError] = useState(false);
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const dispatch = useDispatch()
    const handleAddLink = () => {
        linkService.addLink({ originalURL, targetName, userId: user.id })
            .then(res => {
                console.log("add-link",res.data)
                dispatch({ type: actions.ADDLINK, data: res.data })
                Swal.fire({
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                    text: 'Link added successfully!',
                    position: 'bottom-right'
                });
                navigate('/links');
            })
            .catch(e => {
                Swal.fire({
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2000,
                    text: e.message
                });
            });
    };

    const validateURL = (url) => {
        const re = /^(ftp|http|https):\/\/[^ "]+$/;
        return re.test(url);
    };

    const handleURLChange = (e) => {
        const url = e.target.value;
        setOriginalURL(url);
        setUrlError(!validateURL(url));
    };

    const isFormValid = originalURL && !urlError;

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle' >
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    Add a new link
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <FormInput
                            fluid
                            icon='link'
                            iconPosition='left'
                            placeholder='Original URL'
                            value={originalURL}
                            onChange={handleURLChange}
                            error={urlError ? { content: 'Please enter a valid URL' } : null}
                        />
                        <FormInput
                            fluid
                            icon='tag'
                            iconPosition='left'
                            placeholder='Target Name (optional)'
                            value={targetName}
                            onChange={(e) => setTargetName(e.target.value)}
                        />

                        <Button
                            color='teal'
                            fluid
                            size='large'
                            onClick={handleAddLink}
                            disabled={!isFormValid}
                        >
                            Add Link
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    Go back to <a onClick={() => navigate('/links')}>Links List</a>
                </Message>
            </Grid.Column>
        </Grid>
    );
};

export default AddLink;
