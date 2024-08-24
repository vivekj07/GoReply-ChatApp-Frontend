// LineChart.js
import React from "react";
import { Line, Doughnut } from "react-chartjs-2";

// Import the necessary Chart.js modules
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend,
    ArcElement,
    Filler
} from "chart.js";

// Register the modules
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, ArcElement, Filler);

export const LineChart = ({ dataArr = [], labels, borderColor, backgroundColor, label = "Dataset 1" }) => {
    // Define the data for the line chart
    const data = {
        labels,
        datasets: [
            {
                label,
                data: dataArr,
                fill: true,
                borderColor,
                backgroundColor,
            },


        ],
    };

    // Define the options for the line chart
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                display: false
            },
            tooltip: {
                enabled: true,
            },

        },
        scales: {
            x: {
                display: true,
                grid: {
                    display: false,
                },
                title: {
                    display: false,
                    text: "Days",
                },
            },
            y: {
                display: true,
                grid: {
                    display: false,
                },
                title: {
                    display: false,
                    text: "Messages",
                },
                beginAtZero: false,
            },
        },
    };

    return (
        <div>
            <Line data={data} options={options} />
        </div>
    );
};

export const DoughnutChart = ({ dataArr, labels, backgroundColor, borderColor }) => {
    // Define the data for the doughnut chart
    const data = {
        labels,
        datasets: [
            {
                label: "",
                data: dataArr,
                backgroundColor,
                // : [
                //     "rgba(255, 99, 132, 0.2)",
                //     "rgba(54, 162, 235, 0.2)",
                //     "rgba(255, 206, 86, 0.2)",
                //     "rgba(75, 192, 192, 0.2)",
                //     "rgba(153, 102, 255, 0.2)",
                //     "rgba(255, 159, 64, 0.2)",
                // ],
                borderColor,
                // : [
                //     "rgba(255, 99, 132, 1)",
                //     "rgba(54, 162, 235, 1)",
                //     "rgba(255, 206, 86, 1)",
                //     "rgba(75, 192, 192, 1)",
                //     "rgba(153, 102, 255, 1)",
                //     "rgba(255, 159, 64, 1)",
                // ],
                borderWidth: 2,
                offset: 40

            },
        ],
    };

    // Define the options for the doughnut chart
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                display: false
            },
            tooltip: {
                enabled: true,
            },

        },
        cutout: 100,

    };

    return (
        <div style={{ zIndex: "100" }}>
            <Doughnut data={data} options={options} />
        </div>
    );
};

