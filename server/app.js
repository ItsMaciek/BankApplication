const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

connectDB();
app.use(bodyParser.json());
app.use(cors());
app.use('/api/users', require('./routes/user'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
