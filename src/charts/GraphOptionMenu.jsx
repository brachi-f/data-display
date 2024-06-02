import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown, Menu, Container } from 'semantic-ui-react';
import ClicksByDayChart from './ClicksByDayChart.jsx';
import TargetsChart from './TargetsChart.jsx';
import ClicksChart from './ClicksByDayChart.jsx';
import * as linkService from '../services/linkService.jsx';

const GraphOptionMenu = () => {
    const user = useSelector(state => state.user);
    const [selectedGraph, setSelectedGraph] = useState('clicksByDay');
    const [linkId, setLinkId] = useState('');
    const [linkIds, setLinkIds] = useState([]);

    useEffect(() => {
        if (user) {
            linkService.getUserLinks(user.id)
                .then(res => {
                    const links = res.data;
                    setLinkIds(links.map(link => ({
                        key: link.id,
                        text: link.originalURL,
                        value: link.id
                    })));
                })
                .catch(error => console.error('Error fetching user links:', error));
        }
    }, [user]);

    const handleGraphChange = (event, { value }) => {
        setSelectedGraph(value);
    };

    const handleLinkIdChange = (event, { value }) => {
        setLinkId(value);
    };

    return (
        <Container>
            <h2>Select a Graph to Display</h2>
            <Menu>
                <Dropdown
                    placeholder='Select Graph'
                    selection
                    options={[
                        { key: 'clicksByDay', text: 'Clicks by Day', value: 'clicksByDay' },
                        { key: 'targets', text: 'Targets', value: 'targets' },
                        { key: 'clicks', text: 'Total Clicks', value: 'clicks' },
                    ]}
                    onChange={handleGraphChange}
                    value={selectedGraph}
                />
                {selectedGraph === 'targets' && (
                    <Dropdown
                        placeholder='Select Link ID'
                        selection
                        options={linkIds}
                        onChange={handleLinkIdChange}
                        value={linkId}
                        style={{ marginLeft: '10px' }}
                    />
                )}
            </Menu>
            <div>
                {selectedGraph === 'clicksByDay' && <ClicksByDayChart />}
                {selectedGraph === 'targets' && linkId && <TargetsChart linkId={linkId} />}
                {selectedGraph === 'clicks' && <ClicksChart />}
            </div>
        </Container>
    );
};

export default GraphOptionMenu;
