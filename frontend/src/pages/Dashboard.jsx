import React, { useEffect, useState } from 'react';
import { getEwasteData } from '../services/api';
import Chart from '../components/Chart';
import MapComponent from '../components/Map';

const Dashboard = () => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getEwasteData();
                setData(res.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2 className="mb-4 text-center text-success fw-bold">E-Waste Overview</h2>
            <div className="row g-4">
                <div className="col-lg-6">
                    <div className="card p-3">
                        <h4 className="card-title text-center">Historical Data</h4>
                        {data.length > 0 ? (
                            <Chart data={data} xKey="year" yKeys={['sales_import_tonnes', 'disposal_amount_tonnes']} />
                        ) : (
                            <p className="text-center text-muted">No data available. Go to Upload.</p>
                        )}
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card p-3" style={{ height: '400px' }}>
                        <h4 className="card-title text-center">Disposal Clusters Map</h4>
                        <MapComponent />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
