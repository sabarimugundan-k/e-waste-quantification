const { query } = require('../models/db');

exports.uploadData = async (req, res) => {
    try {
        const dataArray = req.body; 
        
        for (const item of dataArray) {
            await query(
                `INSERT INTO ewaste_data (region, year, sales_import_tonnes, population_millions, disposal_amount_tonnes) 
                 VALUES (?, ?, ?, ?, ?)`,
                [item.region, item.year, item.sales_import_tonnes, item.population_millions, item.disposal_amount_tonnes]
            );
        }
        res.status(201).json({ message: "Data uploaded successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to upload data" });
    }
};

exports.getData = async (req, res) => {
    try {
        const [rows] = await query(`SELECT * FROM ewaste_data ORDER BY year DESC`);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
};

exports.getMapData = async (req, res) => {
    try {
        const [rows] = await query(`SELECT * FROM locations`);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch map data" });
    }
};
