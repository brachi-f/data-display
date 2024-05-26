import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as linkService from '../services/linkService.jsx';
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { generateRandomColors } from "./TargetsChart.jsx";

const ClicksByDayChart = () => {
    const user = useSelector(state => state.user);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (user) {
            linkService.getUserLinks(user.id)
                .then(res => {
                    const links = res.data;
                    const dayClicks = links.map(() => Array(7).fill(0));                    let i = 0;
                    links.forEach(link => {
                        link.clicks.forEach(click => {
                            const clickDate = new Date(click.insertedAt)
                            const day = clickDate.getDay()
                            dayClicks[i][day]++;
                        });
                        i++;
                    });
                    const data = {
                        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                        datasets:
                            links.map((l, index) =>
                            ({
                                label: l.id,
                                data: dayClicks[index],
                                // backgroundColor: generateRandomColors(1),
                                borderColor: generateRandomColors(1),
                                fill: false,
                            }))
                        ,
                    };
                    setChartData(data);
                })
                .catch(error => console.error('Error:', error));
        }
    }, [user]);

    return (
        <div>
            {chartData ? <Line data={chartData} options={{ scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }} /> : <></>}
        </div>
    );
};

export default ClicksByDayChart;
