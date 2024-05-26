// LinkCard.jsx
import React from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import * as linkService from '../services/linkService.jsx';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/action.jsx'

const LinkCard = ({ link }) => {
    const navigate = useNavigate();
    const user = useSelector(s => s.user)
    const dispatch = useDispatch()
    const handleDelete = async () => {
        const confirmation = await Swal.fire({
            title: 'Are you sure you want to delete this link?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (confirmation.isConfirmed) {
            try {
                await linkService.deleteLink(user.id, link.id);
                Swal.fire(
                    'Deleted!',
                    'Your link has been deleted.',
                    'success'
                );
                dispatch({ type: actions.DELETELINK, data: link.id })
            } catch (error) {
                console.error('Error deleting link:', error);
                Swal.fire(
                    'Error!',
                    'An error occurred while deleting the link.',
                    'error'
                );
            }
        }
    };

    const handleDetails = () => {
        navigate(`/links/${link.id}`);
    };

    return (
        <Card fluid>
            <Card.Content>
                <a href={link.originalURL} target="_blank" rel="noopener noreferrer">
                    <Card.Header>{link.originalURL}</Card.Header>
                </a>
                <Card.Meta>
                    Shortened URL:
                    <a href={`http://localhost:3000/${link.id}`} target="_blank" rel="noopener noreferrer">
                        {` http://localhost:3000/${link.id}`}
                    </a>
                </Card.Meta>
                <Card.Description>Target Name: {link.targetName}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                    <Button color='red' onClick={handleDelete}>
                        <Icon name='trash' />
                        Delete
                    </Button>
                    <Button color='teal' onClick={handleDetails}>
                        <Icon name='info circle' />
                        Details
                    </Button>
                </div>
            </Card.Content>
        </Card>
    );
};

export default LinkCard;
