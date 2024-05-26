// LinkDetails.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Header, Segment, Form, Table } from 'semantic-ui-react';
import * as action from '../store/action.jsx'
import * as linkservice from '../services/linkService.jsx';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

const LinkDetails = () => {
    const { id } = useParams();
    const [link, setLink] = useState(null);
    const [targetName, setTargetName] = useState('');
    const [targets, setTargets] = useState([]);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        linkservice.getLinkById(id).then(res => {
            setLink(res.data);
            setTargets(res.data.targetValues);
        }).catch(e => console.error('Error fetching link details:', e));
    }, [id]);

    const handleAddTarget = async () => {
        const newTarget = { targetName: targetName };
        linkservice.addTarget(id, newTarget).then(res => {
            // setLink(res.data)
            // setTargets([res.data.targetValues])
            dispatch({ type: action.SETLINK, data: res.data })
            Swal.fire({
                icon: 'success',
                title: 'נוסף בהצלחה',
                timer: 2000,
                showConfirmButton: false
            })
            navigate(`/links`)
        }).catch(e => Swal.fire({
            icon: 'error',
            title: e.message,
            timer: 2000,
            showConfirmButton: false
        }))
    }

    return (
        <div>
            {link ? (
                <Segment>
                    <Header as='h2'>{link.originalURL}</Header>
                    <p>Shortened URL: http://localhost:3000/{link.id}</p>
                    <p>Target Name: {link.targetName}</p>
                    <Header as='h3'>Clicks</Header>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Date</Table.HeaderCell>
                                <Table.HeaderCell>IP Address</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {link.clicks.map((click, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>{new Date(click.insertedAt).toLocaleString()}</Table.Cell>
                                    <Table.Cell>{click.ipAddress}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                    <Header as='h3'>Targets</Header>
                    <ul>
                        {targets.map((target, index) => (
                            <li key={index}>{target.name}: {target.value}</li>
                        ))}
                    </ul>
                    <Form>
                        <Form.Field>
                            <label>Target Name</label>
                            <input
                                type='text'
                                placeholder='Enter target name'
                                value={targetName}
                                onChange={(e) => setTargetName(e.target.value)}
                            />
                        </Form.Field>
                        <Button color='teal' onClick={handleAddTarget}>Add Target</Button>
                    </Form>
                </Segment>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default LinkDetails;
