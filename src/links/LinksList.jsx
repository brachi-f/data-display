// LinksList.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Header, Card } from 'semantic-ui-react';
import LinkCard from './LinkCard';

const LinksList = () => {
    const links = useSelector(state => state.links || []);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user]);

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='top'>
            <Grid.Column style={{ maxWidth: 800 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    Your Links
                </Header>
                <Button color='teal' onClick={() => navigate('/add-link')}>
                    Add Link
                </Button>
                <Card.Group>
                    {links.length > 0 ? (
                        links.map(link => (
                            <LinkCard key={link.id} link={link} />
                        ))
                    ) : (
                        <Card>
                            <Card.Content>
                                <Card.Header>No Links Found</Card.Header>
                                <Card.Description>
                                    You don't have any links yet. Click "Add Link" to create one.
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    )}
                </Card.Group>
            </Grid.Column>
        </Grid>
    );
};

export default LinksList;
