import Papa from 'papaparse'; // Importing Papa library for parsing CSV data
import { useEffect, useState } from 'react'; // Importing React hooks for managing component state
import { Bar } from 'react-chartjs-2'; // Importing Bar component from react-chartjs-2 library
import 'hammerjs'; // Importing Hammer.js library for touch support
import 'chartjs-plugin-zoom'; // Importing Chart.js zoom plugin

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'; // Importing necessary Chart.js components

// Registering Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

// Defining StockChart functional component with props graphData
function StockChart({ graphData }) {
    const [chartData, setChartData] = useState({ // State for chart data
        datasets: []
    });
    const [chartOptions, setChartOptions] = useState({}); // State for chart options

    // Effect hook to parse CSV data and update chart
    useEffect(() => {
        Papa.parse(graphData, {
            download: true,
            header: true,
            dynamicTyping: true,
            complete: (result) => {
                console.log(result);
                const labels = result.data.map(item => item.Date.trim()); // Extracting date labels
                const data = result.data.map(item => ({ // Processing data points
                    x: item.Date.trim(),
                    y: +item.Close.toFixed(2) || 0,
                    open: item.Open.toFixed(2),
                    high: item.High.toFixed(2),
                    low: item.Low.toFixed(2),
                    close: item.Close.toFixed(2),
                    adjClose: item['Adj Close'].toFixed(2),
                    volume: item.Volume
                }));

                // Updating chart data and options
                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: "Close Price",
                            data: data,
                            borderColor: "blue",
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
                                beforeLabel: function (context) {
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
                                enabled: true,
                                mode: 'xy',
                            },
                            zoom: {
                                wheel: {
                                    enabled: true,
                                },
                                pinch: {
                                    enabled: true,
                                },
                                mode: 'xy',
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
    }, [graphData]); // Dependency array to re-run effect when graphData changes

    // Rendering JSX for StockChart component
    return (
        <div>
            <h1>Stock Chart</h1>
            {
                chartData.datasets.length > 0 ? (
                    <div>
                        <Bar options={chartOptions} data={chartData} /> {/* Rendering Bar chart */}
                    </div>
                ) :
                    <div>
                        Loading...
                    </div>
            }
        </div>
    )

}

export default StockChart; // Exporting StockChart component
