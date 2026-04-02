const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

let db;

async function initDB() {
  try {
    db = await open({
      filename: './ewaste.db',
      driver: sqlite3.Database
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS ewaste_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        region TEXT NOT NULL,
        year INTEGER NOT NULL,
        sales_import_tonnes REAL NOT NULL,
        population_millions REAL NOT NULL,
        disposal_amount_tonnes REAL NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS predictions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        region TEXT NOT NULL,
        forecast_year INTEGER NOT NULL,
        predicted_tonnes REAL NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS locations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        region TEXT NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        severity TEXT NOT NULL
      )
    `);

    await db.exec(`
      INSERT INTO locations (region, latitude, longitude, severity) 
      SELECT 'Pollachi, Tamil Nadu', 10.6609, 77.0048, 'High'
      WHERE NOT EXISTS (SELECT 1 FROM locations WHERE region='Pollachi, Tamil Nadu')
    `);

    console.log("Database & tables initialized successfully with SQLite.");
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }
}

async function query(sql, params = []) {
    if (!db) await initDB();
    
    // Check if INSERT / UPDATE to normalize API
    // Replace ? with $1, $2 or just let sqlite3 handle standard ? 
    // sqlite handles ? perfectly.
    if (sql.trim().toUpperCase().startsWith('SELECT')) {
        const rows = await db.all(sql, params);
        return [rows, null];
    } else {
        const result = await db.run(sql, params);
        return [result, null];
    }
}

module.exports = {
  initDB,
  query
};
