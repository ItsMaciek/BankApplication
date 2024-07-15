const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Połączenie z MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Konfiguracja CORS
app.use(cors());

// Trasy
//app.use('/api/accounts', require('./routes/account'));
app.use('/api/users', require('./routes/user'));

// Uruchomienie serwera
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
