import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import * as linkService from '../services/linkService.jsx';

const ClicksChart = () => {
    const user = useSelector(state => state.user);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (user) {
            linkService.getUserLinks(user.id)
                .then(res => {
                    const links = res.data;
                    const labels = links.map(link => link.originalURL);
                    const clicksData = links.map(link => link.clicks.length);
                    const data = {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Clicks',
                                data: clicksData,
                                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                                borderWidth: 1,
                            },
                        ],
                    };
                    setChartData(data);
                })
                .catch(error => console.error('Error fetching user links:', error));
        }
    }, [user]);

    return (
        <div>
            {chartData && <Bar data={chartData} />}
        </div>
    );
};

export default ClicksChart;
