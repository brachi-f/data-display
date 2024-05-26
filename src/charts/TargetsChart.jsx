import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as linkService from '../services/linkService.jsx';
import { Pie } from "react-chartjs-2";

export const generateRandomColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
        const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`;
        colors.push(color);
    }
    return colors;
};

const TargetsChart = ({ linkId }) => {
    const user = useSelector(s => s.user);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (user) {
            linkService.getLinkById(linkId).then(res => {
                const link = res.data;
                const labels = link.targetValues?.map(t => t.name);
                const targetsData = link.targetValues?.map(t => t.value);
                const backgroundColors = generateRandomColors(labels.length);

                const data = {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Targets',
                            data: targetsData,
                            backgroundColor: backgroundColors,
                            borderWidth: 1,
                        },
                    ],
                };
                setChartData(data);
            }).catch(e => console.error("ERROR:", e.message));
        }
    }, [user, linkId]);

    return (
        <div>
            {chartData ? <Pie data={chartData} /> : <></>}
        </div>
    );
};

export default TargetsChart;
