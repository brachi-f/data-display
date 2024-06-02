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
        if (user && linkId) {
            console.log(`Fetching data for linkId: ${linkId}`);
            linkService.getLinkById(linkId).then(res => {
                const link = res.data;
                console.log('Fetched link data:', link);
                if (link.targetValues && link.targetValues.length > 0) {
                    const labels = link.targetValues.map(t => t.name);
                    const targetsData = link.targetValues.map(t => t.value);
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
                } else {
                    console.log('No target values found for this link');
                }
            }).catch(e => console.error("ERROR fetching link data:", e.message));
        }
    }, [user, linkId]);

    return (
        <div>
            {chartData ? <Pie data={chartData} /> : <p>No data available for this link</p>}
        </div>
    );
};

export default TargetsChart;
