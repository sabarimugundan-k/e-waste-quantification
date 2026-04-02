const mysql = require('mysql2/promise');
const config = require('../config/config');

let pool;

async function initDB() {
  try {
    const connection = await mysql.createConnection({
      host: config.db.host,
      user: config.db.user,
      password: config.db.password,
    });
    
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${config.db.database}\`;`);
    await connection.end();

    pool = mysql.createPool({
      host: config.db.host,
      user: config.db.user,
      password: config.db.password,
      database: config.db.database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    await pool.query(`
      CREATE TABLE IF NOT EXISTS ewaste_data (
        id INT AUTO_INCREMENT PRIMARY KEY,
        region VARCHAR(100) NOT NULL,
        year INT NOT NULL,
        sales_import_tonnes FLOAT NOT NULL,
        population_millions FLOAT NOT NULL,
        disposal_amount_tonnes FLOAT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS predictions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        region VARCHAR(100) NOT NULL,
        forecast_year INT NOT NULL,
        predicted_tonnes FLOAT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS locations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        region VARCHAR(100) NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL,
        severity VARCHAR(50) NOT NULL
      )
    `);

    console.log("Database & tables initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }
}

async function query(sql, params) {
  if (!pool) await initDB();
  return pool.query(sql, params);
}

module.exports = {
  initDB,
  query
};
