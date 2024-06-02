import React from 'react';
import { Container, Header as SemanticHeader, Segment, Grid, Button, Icon, Menu } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <HeroSection />
            <FeaturesSection />
            <Footer />
        </div>
    );
};

const HeroSection = () => {
    const navigate = useNavigate()
    return(
    <Segment inverted textAlign='center' style={{ minHeight: 700, padding: '1em 0em' }} vertical>
        <Container text>
            <SemanticHeader color='teal'
                as='h1'
                content='Welcome to TinyUrl'
                inverted
                style={{
                    fontSize: '4em',
                    fontWeight: 'normal',
                    marginBottom: 0,
                    marginTop: '3em',
                }}
            />
            <SemanticHeader
                as='h2'
                content='Shorten your URLs quickly and conveniently with TinyUrl. Manage your links, track clicks, and target your audience effectively.'
                inverted
                style={{
                    fontSize: '1.7em',
                    fontWeight: 'normal',
                    marginTop: '1.5em',
                }}
            />
            <Button color='teal' size='huge' onClick={()=>navigate('/links')}>
                Get Started
                <Icon name='right arrow' />
            </Button>
        </Container>
    </Segment>)
};

const FeaturesSection = () => (
    <Segment style={{ padding: '8em 0em' }} vertical>
        <Container>
            <Grid divided stackable>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <SemanticHeader as='h3' style={{ fontSize: '2em' }}>
                            Feature One
                        </SemanticHeader>
                        <p style={{ fontSize: '1.33em' }}>
                            Shorten URLs quickly and conveniently.
                        </p>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <SemanticHeader as='h3' style={{ fontSize: '2em' }}>
                            Feature Two
                        </SemanticHeader>
                        <p style={{ fontSize: '1.33em' }}>
                            Manage your links and track clicks effortlessly.
                        </p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <SemanticHeader as='h3' style={{ fontSize: '2em' }}>
                            Feature Three
                        </SemanticHeader>
                        <p style={{ fontSize: '1.33em' }}>
                            Target your audience effectively with detailed analytics.
                        </p>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <SemanticHeader as='h3' style={{ fontSize: '2em' }}>
                            Feature Four
                        </SemanticHeader>
                        <p style={{ fontSize: '1.33em' }}>
                            Customize your URLs and enhance your branding.
                        </p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    </Segment>
);

const Footer = () => (
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
        <Container textAlign='center'>
            <Grid divided inverted stackable>
                <Grid.Row>
                    <Grid.Column width={7}>
                        <SemanticHeader inverted as='h4' content='About TinyUrl' />
                        <p>Your ultimate URL shortening solution. TinyUrl is designed to make your life easier by providing fast and reliable link management services.</p>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <SemanticHeader inverted as='h4' content='Services' />
                        <Menu inverted>
                            <Menu.Item as='a'>Link Shortening</Menu.Item>
                            <Menu.Item as='a'>Click Tracking</Menu.Item>
                            <Menu.Item as='a'>Audience Targeting</Menu.Item>
                            <Menu.Item as='a'>Customization</Menu.Item>
                        </Menu>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <SemanticHeader inverted as='h4' content='Contact Us' />
                        <p>For inquiries, please email us at contact@tinyurl.com or call us at (123) 456-7890. Stay updated with our latest news and updates on social media.</p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <div style={{ marginTop: '2em' }}>
                <Icon name='facebook' size='big' />
                <Icon name='twitter' size='big' />
                <Icon name='instagram' size='big' />
            </div>
            <p style={{ marginTop: '2em' }}>
                &copy; {new Date().getFullYear()} TinyUrl. All rights reserved.
            </p>
        </Container>
    </Segment>
);

export default Home;
