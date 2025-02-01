const express = require('express');
const mongoose = require('mongoose');
const restaurantRoutes = require('./route');

const app = express();
const port = 3000;

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
}).on('error', (err) => {
    console.error('MongoDB connection error:', err);
})

app.use(express.json());

app.use('/', restaurantRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});