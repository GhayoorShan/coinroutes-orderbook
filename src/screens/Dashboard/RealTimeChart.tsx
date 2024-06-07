import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RealTimeChart: React.FC = () => {
    const { bestBid, bestAsk } = useSelector((state: RootState) => state.orderBook);
    const [chartData, setChartData] = useState({
        labels: [] as string[],
        datasets: [
            {
                label: 'Top Bids',
                data: [] as number[],
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)'
            },
            {
                label: 'Top Asks',
                data: [] as number[],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)'
            }
        ]
    });

    useEffect(() => {
        if (bestBid && bestAsk) {
            const currentTime = new Date().toLocaleTimeString();

            setChartData((prevData) => {
                const updatedLabels = [...prevData.labels, currentTime].slice(-20);
                const updatedBidData = [...prevData.datasets[0].data, parseFloat(bestBid.price)].slice(-20);
                const updatedAskData = [...prevData.datasets[1].data, parseFloat(bestAsk.price)].slice(-20);

                return {
                    labels: updatedLabels,
                    datasets: [
                        {
                            ...prevData.datasets[0],
                            data: updatedBidData
                        },
                        {
                            ...prevData.datasets[1],
                            data: updatedAskData
                        }
                    ]
                };
            });
        }
    }, [bestBid, bestAsk]);

    return (
        <div style={{ height: '600px', width: '800px', paddingTop: '100px' }}>
            <Line
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top'
                        },
                        title: {
                            display: true,
                            text: 'Real-Time Top Bids and Asks'
                        }
                    },
                    scales: {
                        x: {
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
                }}
                height={600}
                width={800}
            />
        </div>
    );
};

export default RealTimeChart;
