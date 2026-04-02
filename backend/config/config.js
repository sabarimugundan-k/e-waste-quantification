require('dotenv').config();

module.exports = {
  db: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ewaste_schema',
  },
  port: process.env.PORT || 5000,
  flaskUrl: process.env.FLASK_URL || 'http://localhost:5001'
};
