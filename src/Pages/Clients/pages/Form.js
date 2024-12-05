import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

function Form() {
    const [fileData, setFileData] = useState(null);
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [chartType, setChartType] = useState('line');
    const [chartData, setChartData] = useState(null);
    const [chartTitle, setChartTitle] = useState('Graph Data'); // For changing graph name
    const [legendVisible, setLegendVisible] = useState(true); // For toggling legends visibility

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (file.type !== 'application/json' && !file.name.endsWith('.csv')) {
            alert('Please upload a valid JSON or CSV file');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const fileContent = reader.result;
            try {
                const jsonData = JSON.parse(fileContent);
                setUploading(true);
                let uploadProgress = 0;
                const simulateUpload = () => {
                    uploadProgress += 10;
                    setProgress(uploadProgress);
                    if (uploadProgress < 100) {
                        setTimeout(simulateUpload, 300);
                    } else {
                        setFileData(jsonData);
                        setUploading(false);
                        generateChartData(jsonData);
                    }
                };
                simulateUpload();
            } catch (error) {
                console.error('Invalid JSON format:', error);
                alert('Failed to parse JSON file. Please upload a valid JSON file.');
            }
        };
        reader.readAsText(file);
    };

    const handleUploadAgain = () => {
        setFileData(null);
        setUploading(false);
        setProgress(0);
        setChartData(null);
        setChartType('line');
    };

    const generateChartData = (jsonData) => {
        const labels = jsonData[0]?.data?.[0]?.data.map((_, index) => `Month ${index + 1}`);
        const datasets = jsonData.flatMap((category) =>
            category.data.map((item, i) => ({
                label: item.label,
                data: item.data,
                borderColor: item.color || '#0000FF', // Default color for each item (blue)
                backgroundColor: item.color ? `${item.color}80` : 'rgba(0, 0, 255, 0.2)', // Lighter shade for background
                borderWidth: 1,
                fill: false,
            }))
        );

        setChartData({
            labels: labels,
            datasets: datasets,
        });
    };

    const handleChartChange = (type) => {
        setChartType(type);
    };

    const handleLegendToggle = () => {
        setLegendVisible(!legendVisible);
    };

    const handleColorChange = (categoryIndex, itemIndex, color) => {
        const updatedFileData = [...fileData];
        updatedFileData[categoryIndex].data[itemIndex].color = color; // Update color for specific item
        setFileData(updatedFileData);
        generateChartData(updatedFileData); // Re-generate chart data with updated colors
    };

    return (
        <div>
            {/* File upload logic */}
            {!fileData && !uploading ? (
                <div className="w-full mb-5">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center py-9 w-full border border-gray-300 border-dashed rounded cursor-pointer bg-gray-50">
                        <div className="mb-3 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <g id="Upload 02">
                                    <path id="icon" d="M16.296 25.3935L19.9997 21.6667L23.7034 25.3935M19.9997 35V21.759M10.7404 27.3611H9.855C6.253 27.3611 3.33301 24.4411 3.33301 20.8391C3.33301 17.2371 6.253 14.3171 9.855 14.3171V14.3171C10.344 14.3171 10.736 13.9195 10.7816 13.4326C11.2243 8.70174 15.1824 5 19.9997 5C25.1134 5 29.2589 9.1714 29.2589 14.3171H30.1444C33.7463 14.3171 36.6663 17.2371 36.6663 20.8391C36.6663 24.4411 33.7463 27.3611 30.1444 27.3611H29.2589" stroke="#4F46E5" strokeWidth="1.6" strokeLinecap="round" />
                                </g>
                            </svg>
                        </div>
                        <h2 className="text-center text-gray-400 text-xs font-normal leading-4 mb-1">JSON or CSV file only</h2>
                        <h4 className="text-center text-gray-900 text-sm font-medium leading-snug">Drag and Drop your file here or</h4>
                        <input id="dropzone-file" type="file" className="hidden" onChange={handleFileUpload} accept=".json, .csv" />
                    </label>
                </div>
            ) : null}

            {uploading && (
                <div className="w-full grid gap-1">
                    <div className="relative flex items-center gap-2.5 py-1.5">
                        <div className="relative w-full h-2.5 overflow-hidden rounded-3xl bg-gray-100">
                            <div
                                role="progressbar"
                                aria-valuenow={progress}
                                aria-valuemin="0"
                                aria-valuemax="100"
                                className="flex h-full items-center justify-center bg-indigo-600 text-white rounded-3xl"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <span className="ml-2 bg-white rounded-full text-gray-800 text-xs font-medium flex justify-center items-center">{progress}%</span>
                    </div>
                </div>
            )}

            {fileData && !uploading && (
                <div>
                    <button onClick={handleUploadAgain} className="mb-4 px-4 py-2 bg-gradient-to-tl from-blue-600 to-violet-600 text-white rounded-sm">Upload Again</button>

                    {/* Graph Settings */}
                    <div className="mb-4">
                        <label className="block mb-2">Graph Title:</label>
                        <input
                            type="text"
                            value={chartTitle}
                            onChange={(e) => setChartTitle(e.target.value)}
                            className="p-2 border rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">Show Legends:</label>
                        <input
                            type="checkbox"
                            checked={legendVisible}
                            onChange={handleLegendToggle}
                            className="p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <h4>Change Category Colors:</h4>
                        {fileData.map((category, categoryIndex) => (
                            <div key={categoryIndex}>
                                <h5>{category.category}</h5>
                                {category.data.map((item, itemIndex) => (
                                    <div key={itemIndex} className="flex items-center mb-2">
                                        <label>{item.label}:</label>
                                        <input
                                            type="color"
                                            value={item.color || '#0000FF'}
                                            onChange={(e) => handleColorChange(categoryIndex, itemIndex, e.target.value)}
                                            className="ml-2"
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 bg-slate-100 border-slate-200 border">Category</th>
                                <th className="px-4 py-2 bg-slate-100 border-slate-200 border">Label</th>
                                <th className="px-4 py-2 bg-slate-100 border-slate-200 border">Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fileData.map((category, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2 bg-slate-50 border-slate-200 border">{category.category}</td>
                                    <td className="px-4 py-2 bg-slate-50 border-slate-200 border">
                                        {category.data.map((item, i) => (
                                            <div key={i}>
                                                <strong>{item.label}</strong>: {item.data.join(', ')} ({item.type})
                                            </div>
                                        ))}
                                    </td>
                                    <td className="px-4 py-2 bg-slate-50 border-slate-200 border">{category.data.map((item, i) => (
                                        <div key={i}>{item.data.join(', ')}</div>
                                    ))}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex gap-4 mt-4">
                        <button onClick={() => handleChartChange('line')} className="px-4 py-2 bg-gradient-to-tl from-blue-600 to-violet-600 text-white rounded-sm">Line Chart</button>
                        <button onClick={() => handleChartChange('bar')} className="px-4 py-2 bg-gradient-to-tl from-blue-600 to-violet-600 text-white rounded-sm">Bar Chart</button>
                        <button onClick={() => handleChartChange('spline')} className="px-4 py-2 bg-gradient-to-tl from-blue-600 to-violet-600 text-white rounded-sm">Spline Chart</button>
                    </div>

                    <div className="mt-12">
                        {chartData && chartType === 'line' && (
                            <Line
                                data={chartData}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        title: { display: true, text: chartTitle },
                                        legend: {
                                            display: legendVisible,
                                            position: 'top',
                                        },
                                    },
                                }}
                            />
                        )}
                        {chartData && chartType === 'bar' && (
                            <Bar
                                data={chartData}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        title: { display: true, text: chartTitle },
                                        legend: {
                                            display: legendVisible,
                                            position: 'top',
                                        },
                                    },
                                }}
                            />
                        )}
                        {chartData && chartType === 'spline' && (
                            <div className='border-t-4 border-slate-100 '>
                                <h1 className='text-3xl font-bold mt-4'>Spline Chart</h1>
                                <Line
                                    data={chartData}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            title: { display: true, text: chartTitle },
                                            legend: {
                                                display: legendVisible,
                                                position: 'top',
                                            },
                                        },
                                        elements: { line: { tension: 0.4 } }
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Form;
