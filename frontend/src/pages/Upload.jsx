import React, { useState } from 'react';
import { uploadData } from '../services/api';

const Upload = () => {
    const [text, setText] = useState('[\n  {\n    "region": "Urban",\n    "year": 2025,\n    "sales_import_tonnes": 1200,\n    "population_millions": 5.5,\n    "disposal_amount_tonnes": 400\n  }\n]');

    const handleUpload = async () => {
        try {
            const data = JSON.parse(text);
            await uploadData(data);
            alert('Data uploaded successfully!');
            setText('');
        } catch (error) {
            alert('Invalid JSON or upload failed.');
            console.error(error);
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card p-4">
                    <h3 className="card-title text-center mb-3">Upload Current E-Waste Data</h3>
                    <p className="text-muted text-center">Paste JSON data containing region, year, sales/imports, population, and disposal amounts.</p>
                    <textarea 
                        className="form-control mb-3" 
                        rows="10" 
                        value={text} 
                        onChange={(e) => setText(e.target.value)}
                    ></textarea>
                    <button className="btn btn-success w-100 fw-bold" onClick={handleUpload}>
                        Upload Data
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Upload;
