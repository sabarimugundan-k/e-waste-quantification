const axios = require('axios');
const { query } = require('../models/db');
const config = require('../config/config');

exports.predictEwaste = async (req, res) => {
    try {
        const { region, forecast_year, sales_import_tonnes, population_millions } = req.body;
        
        // 1. Call Flask ML Service
        const flaskResponse = await axios.post(`${config.flaskUrl}/predict`, [{
            sales_import_tonnes,
            population_millions
        }]);

        const predictions = flaskResponse.data.predictions;
        if (!predictions || predictions.length === 0) {
            return res.status(500).json({ error: "No prediction returned from ML service" });
        }

        const predicted_tonnes = predictions[0];

        // 2. Store prediction
        await query(
            `INSERT INTO predictions (region, forecast_year, predicted_tonnes) VALUES (?, ?, ?)`,
            [region, forecast_year, predicted_tonnes]
        );

        res.status(200).json({
            region,
            forecast_year,
            predicted_tonnes
        });
    } catch (error) {
        console.error("Prediction Error:", error.message);
        res.status(500).json({ error: "Failed to generate prediction" });
    }
};

exports.getPredictions = async (req, res) => {
    try {
        const [rows] = await query(`SELECT * FROM predictions ORDER BY forecast_year DESC`);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch predictions" });
    }
};
