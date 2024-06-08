import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { Chart as ChartJS, CategoryScale, LinearScale, TimeScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';
import 'chartjs-adapter-date-fns'; // Import the date-fns adapter
import { RootState } from '../../redux/store';
import { Grid } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, TimeScale, PointElement, LineElement, Title, Tooltip, Legend);

const RealTimeChart: React.FC = () => {
    const bestBid = useSelector((state: RootState) => state.orderBook.bestBid);
    const bestAsk = useSelector((state: RootState) => state.orderBook.bestAsk);
    const [chartData, setChartData] = useState<{ time: string; bestBid: number; bestAsk: number }[]>([]);

    useEffect(() => {
        if (bestBid && bestAsk) {
            setChartData((prevData) => {
                const newData = [{ time: new Date().toISOString(), bestBid: Number(bestBid.price), bestAsk: Number(bestAsk.price) }, ...prevData];
                return newData; // Limit the data to the last 20 records
            });
        }
    }, [bestBid, bestAsk]);

    const data = {
        labels: chartData.map((d) => d.time),
        datasets: [
            {
                label: 'Best Bid',
                data: chartData.map((d) => ({ x: d.time, y: d.bestBid })),
                fill: false,
                borderColor: 'green'
            },
            {
                label: 'Best Ask',
                data: chartData.map((d) => ({ x: d.time, y: d.bestAsk })),
                fill: false,
                borderColor: 'red'
            }
        ]
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'second'
                },
                title: {
                    display: true,
                    text: 'Time'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Price'
                }
            }
        }
    };

    return <Grid pt={10}>{chartData.length > 0 ? <Line data={data} options={options} height={400} width={600} /> : <p>No data available</p>}</Grid>;
};

export default RealTimeChart;
