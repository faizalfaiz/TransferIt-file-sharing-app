require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
 const cors = require('cors');
// Cors 


app.use(express.static('public'));
require('./config/db');
connectDB();
const corsOptions = {
    origin: ['https://transferit-fileshare.herokuapp.com', 'http://127.0.0.1:3001/index.html']

}

app.use(cors(corsOptions));
app.use(express.json());
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use('/files', require('./routes/show'));
app.use('/api/files', require('./routes/files'));
app.use('/files/download', require('./routes/download'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



app.listen(PORT, () => { console.log(`Listening on port ${PORT}.`); });