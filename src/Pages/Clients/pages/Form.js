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
    const [chartType, setChartType] = useState('line'); // 'line', 'bar'
    const [chartData, setChartData] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Only allow JSON or CSV files
        if (file.type !== 'application/json' && !file.name.endsWith('.csv')) {
            alert('Please upload a valid JSON or CSV file');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const fileContent = reader.result;
            try {
                const jsonData = JSON.parse(fileContent);

                // Simulate a progress bar for file upload
                setUploading(true);
                let uploadProgress = 0;

                // Use setTimeout to simulate progress
                const simulateUpload = () => {
                    uploadProgress += 10;
                    setProgress(uploadProgress);

                    if (uploadProgress < 100) {
                        setTimeout(simulateUpload, 300); // Simulate upload every 300ms
                    } else {
                        // When progress reaches 100%, set file data
                        setFileData(jsonData);
                        setUploading(false); // End uploading state
                        generateChartData(jsonData); // Generate chart data
                    }
                };

                simulateUpload(); // Start simulated upload
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

    // Function to generate chart data based on file data
    const generateChartData = (jsonData) => {
        const labels = jsonData[0]?.data?.[0]?.data.map((_, index) => `Month ${index + 1}`);

        // Create dataset for chart
        const datasets = jsonData.flatMap((category) =>
            category.data.map((item) => ({
                label: item.label,
                data: item.data,
                borderColor: category.category === 'Revenue' ? 'blue' : 'orange',
                backgroundColor: category.category === 'Revenue' ? 'rgba(0, 0, 255, 0.2)' : 'rgba(255, 165, 0, 0.2)',
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

    return (
        <div>
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
                    <button onClick={handleUploadAgain} className="mb-4 px-4 py-2 bg-gradient-to-tl from-blue-600 to-violet-600 text-white rounded-md">Upload Again</button>
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
                        <button onClick={() => handleChartChange('line')} className="px-4 py-2 bg-gradient-to-tl from-blue-600 to-violet-600 text-white rounded-md">Line Chart</button>
                        <button onClick={() => handleChartChange('bar')} className="px-4 py-2 bg-gradient-to-tl from-blue-600 to-violet-600 text-white rounded-md">Bar Chart</button>
                    </div>

                    <div className="mt-6">
                        {chartData && chartType === 'line' && (
                            <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Sales Data' } } }} />
                        )}
                        {chartData && chartType === 'bar' && (
                            <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Sales Data' } } }} />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Form;
