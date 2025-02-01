const express = require('express');
const Restaurant = require('./restaurant');

const router = express.Router();

router.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get restaurant by cuisine
router.get('/restaurants/cuisine/:cuisine', async (req, res) => {
    try {
        const cuisine = req.params.cuisine;
        const restaurants = await Restaurant.find({ cuisine: cuisine });
        if (restaurants.length === 0) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        res.json(restaurants);
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/restaurants', async (req, res) => {
    const { sortBy = 'ASC' } = req.query;

    if (sortBy !== 'ASC' && sortBy !== 'DESC') {
        return res.status(400).json({ error: 'Invalid sortBy parameter. Use "ASC" or "DESC".' });
    }

    try {
        const sortOrder = sortBy === 'ASC' ? 1 : -1;
        const restaurants = await Restaurant.find({}, { _id: 1, name: 1, cuisine: 1, city: 1, restaurant_id: 1 })
            .sort({ restaurant_id: sortOrder });

        res.json(restaurants);
    } catch (err) {
        console.error('Error fetching restaurants:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Route to get restaurant details with specified conditions and sorting
router.get('/restaurants/Delicatessen', async (req, res) => {
    try {
        const restaurants = await Restaurant.find(
            { cuisine: 'Delicatessen', city: { $ne: 'Brooklyn' } },
            { _id: 0, cuisine: 1, name: 1, city: 1 }
        )
        .sort({ name: 1 });

        res.json(restaurants);
    } catch (err) {
        console.error('Error fetching restaurants:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
