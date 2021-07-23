const express = require('express');
const connectDB = require('./config/db');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const cors = require('cors');
// Cors 
const corsOptions = {
  origin: process.env.ALLOWED_CLIENTS.split(',')
  // ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:3300']
}

app.use(cors(corsOptions));
app.use(express.static('public'));
require('./config/db');
connectDB();
app.use(express.json());
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use('/api/files', require('./routes/files'));
app.use('/files/download', require('./routes/download'));
app.use('/files', require('./routes/show'));




app.listen(PORT, () => { console.log(`Listening on port ${PORT}.`); });