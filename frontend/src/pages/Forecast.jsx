import React, { useState, useEffect } from 'react';
import { getPredictions, predictEwaste } from '../services/api';
import Chart from '../components/Chart';

const Forecast = () => {
    const [forecasts, setForecasts] = useState([]);
    const [input, setInput] = useState({ region: 'Urban', forecast_year: 2026, sales_import_tonnes: 1500, population_millions: 6.0 });

    const loadPredictions = async () => {
        try {
            const res = await getPredictions();
            setForecasts(res.data);
        } catch (error) {
            console.error("Error fetching", error);
        }
    };

    useEffect(() => {
        loadPredictions();
    }, []);

    const handlePredict = async () => {
        try {
            await predictEwaste(input);
            alert("Prediction Generated!");
            loadPredictions();
        } catch (error) {
            alert("Prediction failed. Ensure ML service is running.");
            console.error(error);
        }
    };

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="card p-4">
                    <h4>New Forecast</h4>
                    <input className="form-control mb-2" value={input.region} onChange={e=>setInput({...input, region:e.target.value})} placeholder="Region" />
                    <input className="form-control mb-2" type="number" value={input.forecast_year} onChange={e=>setInput({...input, forecast_year:parseInt(e.target.value)})} placeholder="Year" />
                    <input className="form-control mb-2" type="number" value={input.sales_import_tonnes} onChange={e=>setInput({...input, sales_import_tonnes:parseFloat(e.target.value)})} placeholder="Sales/Imports (Tonnes)" />
                    <input className="form-control mb-3" type="number" value={input.population_millions} onChange={e=>setInput({...input, population_millions:parseFloat(e.target.value)})} placeholder="Population (Millions)" />
                    <button className="btn btn-primary w-100" onClick={handlePredict}>Generate Forecast</button>
                </div>
            </div>
            <div className="col-md-8">
                <div className="card p-3">
                    <h4 className="text-center">Forecast Timeline</h4>
                    {forecasts.length > 0 ? (
                        <Chart data={forecasts} xKey="forecast_year" yKeys={['predicted_tonnes']} />
                    ) : (
                        <p className="text-center text-muted mt-3">No forecasts available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Forecast;
