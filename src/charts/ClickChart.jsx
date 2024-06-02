import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as linkService from '../services/linkService.jsx';
import { Bar } from "react-chartjs-2";

const ClicksChart = () => {
    const user = useSelector(state => state.user);
    const [chartData, setChartData] = useState(null);
    const [options, setOptions] = useState(null);

    useEffect(() => {
        if (user) {
            linkService.getUserLinks(user.id)
                .then(res => {
                    const links = res.data;
                    const labels = links.map(link => link.id);
                    const clicksData = links.map(link => link.clicks.length || 0);
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
                    setOptions({
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    stepSize: 1
                                },
                                max: Math.max(...clicksData) + 5
                            }
                        }
                    });
                })
                .catch(error => console.error('Error fetching user links:', error));
        }
    }, [user]);

    return (
        <div>
            {chartData && options ? <Bar data={chartData} options={options} /> : <></>}
        </div>
    );
};

export default ClicksChart;
