import React from "react";
import { Doughnut, Line } from "react-chartjs-2";

import {
    ArcElement,
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, ArcElement, Filler);

export const LineChart = ({ dataArr = [], labels, borderColor, backgroundColor, label = "Dataset 1" }) => {
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

    const options = {
        responsive: true,
        maintainAspectRatio: false,
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
        <div style={{ width: "100%", height: "400px" }}>  {/* Added height for better visualization */}
            <Line data={data} options={options} />
        </div>
    );
};

export const DoughnutChart = ({ dataArr, labels, backgroundColor, borderColor }) => {
    const data = {
        labels,
        datasets: [
            {
                label: "",
                data: dataArr,
                backgroundColor,
                borderColor,
                borderWidth: 2,
                offset: 40

            },
        ],
    };

    const options = {
        responsive: true,
        // maintainAspectRatio: false,
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
        <div style={{ width: "100%", height: "300px", position: "relative" }}>  {/* Set height/width */}
            <Doughnut data={data} options={options} />
        </div>
    );
};

