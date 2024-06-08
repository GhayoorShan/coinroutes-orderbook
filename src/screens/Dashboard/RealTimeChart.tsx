import React from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { Chart as ChartJS, CategoryScale, LinearScale, TimeScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { RootState } from '../../redux/store';
import { CircularProgress, Grid } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, TimeScale, PointElement, LineElement, Title, Tooltip, Legend);

const RealTimeChart: React.FC = () => {
    const bestBidData = useSelector((state: RootState) => state.chart.bestBidData);
    const bestAskData = useSelector((state: RootState) => state.chart.bestAskData);

    const data = {
        labels: bestBidData.map((d) => d.time),
        datasets: [
            {
                label: 'Best Bid',
                data: bestBidData.map((d) => ({ x: d.time, y: Number(d.price) })),
                fill: false,
                borderColor: 'green'
            },
            {
                label: 'Best Ask',
                data: bestAskData.map((d) => ({ x: d.time, y: Number(d.price) })),
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

    return (
        <Grid pt={10} container justifyContent="center" alignItems="center">
            {bestBidData.length > 0 || bestAskData.length > 0 ? (
                <Line data={data} options={options} height={400} width={600} />
            ) : (
                <CircularProgress color="inherit" />
            )}
        </Grid>
    );
};

export default RealTimeChart;
