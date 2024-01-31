const express = require('express');

const mongoose = require('mongoose');
require("dotenv").config();

// fethc
const routes = require('./routes/userRoute')

const cors = require('cors');

// .env
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

// connect to MongoDB
mongoose.connect(MONGO_URI)
.then(() => console.log("MongoDB connected..."))
.catch((err) => console.log(err))

// routes; http://localhost:5000/api/
app.use('/api', routes)

// listening in port PORT || 500
app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});