const express = require('express');
const cors = require('cors');
const dataRoutes = require('./routes/dataRoutes');
const predictRoutes = require('./routes/predictRoutes');
const { initDB } = require('./models/db');
const config = require('./config/config');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', dataRoutes);
app.use('/api', predictRoutes);

// Initialize DB and start server
initDB().then(() => {
  app.listen(config.port, () => {
    console.log(`Node.js Backend running on http://localhost:${config.port}`);
  });
}).catch(console.error);

module.exports = app;
