import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as linkService from '../services/linkService.jsx';
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

const ClicksByDayChart = () => {
    const user = useSelector(state => state.user);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (user) {
            linkService.getUserLinks(user.id)
                .then(res => {
                    const links = res.data;
                    const dayClicks = Array(7).fill(0); // Initialize array for 7 days

                    links.forEach(link => {
                        link.clicks.forEach(click => {
                            const clickDate = new Date(click.insertedAt); // Assuming each click has a timestamp field
                            const day = clickDate.getDay(); // 0 is Sunday, 1 is Monday, etc.
                            dayClicks[day]++;
                        });
                    });

                    const data = {
                        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                        datasets: [
                            {
                                label: 'Clicks',
                                data: dayClicks,
                                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                fill: false,
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
            {chartData ? <Line data={chartData} options={{ scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }} /> : <></>}
        </div>
    );
};

export default ClicksByDayChart;
