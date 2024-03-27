import AppleData from './AAPL201020.csv';
import Papa from 'papaparse';
import { useEffect, useState } from 'react';
import {Bar} from 'react-chartjs-2';
import 'hammerjs';
import 'chartjs-plugin-zoom';


import {
    Chart as ChartJS, 
    CategoryScale,
    LinearScale,
    BarElement, // can change to LineElement if we want a line graph instead 
    Title,
    Tooltip, 
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement, 
    Title,
    Tooltip, 
    Legend,
)

function StockChart () {
    const[chartData, setChartData] = useState({
        datasets: []
    });
    const[chartOptions, setChartOptions] = useState({})

    useEffect(() => {
        Papa.parse(AppleData, {
            download: true, 
            header: true,
            dynamicTyping: true, 
            complete: (result) => {
                console.log(result);
                const labels = result.data.map(item => item.Date.trim()); 
                const data = result.data.map(item => ({
                    x: item.Date.trim(),
                    y: +item.Close.toFixed(2) || 0, 
                    open: item.Open.toFixed(2),
                    high: item.High.toFixed(2),
                    low: item.Low.toFixed(2),
                    close: item.Close.toFixed(2),
                    adjClose: item['Adj Close'].toFixed(2),
                    volume: item.Volume
                }));
                
                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: "Close Price",
                            data: data,
                            borderColor: "black",
                            backgroundColor: "blue",
                        }
                    ]
                });
                setChartOptions({
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: "Today's Stock",
                        },
                        tooltip: {
                            callbacks: {
                                beforeLabel: function(context) {
                                    const dataItem = context.raw;
                                    return [
                                        `Open: ${dataItem.open}`,
                                        `High: ${dataItem.high}`,
                                        `Low: ${dataItem.low}`,
                                        `Close: ${dataItem.close}`,
                                        `Adj Close: ${dataItem.adjClose}`,
                                        `Volume: ${dataItem.volume}`
                                    ];
                                }
                            }
                        },
                        zoom: {
                            pan: {
                                enabled: true, // Enable panning
                                mode: 'xy', // Panning on both axes
                            },
                            zoom: {
                                wheel: {
                                    enabled: true, // Zooming with mouse wheel
                                },
                                pinch: {
                                    enabled: true, // Zooming with pinch gesture
                                },
                                mode: 'xy', // Zooming on both axes
                            }
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Date"
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Stock Price (in USD)"
                            }
                        }
                    }
                });
                               
                },
            });
        }, []);

    return (
        <div>
            <h1>Stock Chart</h1>
            {
                chartData.datasets.length > 0 ? (
                    <div>
                        <Bar options = {chartOptions} data = {chartData}/>
                     </div>   
                ) :
                <div>
                    Loading...
                 </div> 
            }
        </div>
    )
    
}


export default StockChart;