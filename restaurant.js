const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/restaurantDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
    // seedDummyData();
}).catch(err => console.error('MongoDB connection error:', err));

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cuisine: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    city: { type: String, required: true },
    restaurant_id: { type: Number, required: true, unique: true }
});

function seedDummyData() {
    const dummyRestaurants = [
        { name: 'Sakura Sushi', cuisine: 'Japanese', rating: 4.7, city: 'Toronto', restaurant_id: 1 },
        { name: 'Tokyo Ramen', cuisine: 'Japanese', rating: 4.5, city: 'Vancouver', restaurant_id: 2 },
        { name: 'Kyoto Grill', cuisine: 'Japanese', rating: 4.8, city: 'Ottawa', restaurant_id: 3 },
        { name: 'Sweet Delights', cuisine: 'Bakery', rating: 4.6, city: 'Montreal', restaurant_id: 4 },
        { name: 'Bread & Butter', cuisine: 'Bakery', rating: 4.3, city: 'Calgary', restaurant_id: 5 },
        { name: 'Pastry Haven', cuisine: 'Bakery', rating: 4.9, city: 'Edmonton', restaurant_id: 6 },
        { name: 'Luigi’s Pizzeria', cuisine: 'Italian', rating: 4.7, city: 'Toronto', restaurant_id: 7 },
        { name: 'Pasta Fresca', cuisine: 'Italian', rating: 4.6, city: 'Vancouver', restaurant_id: 8 },
        { name: 'Roma Ristorante', cuisine: 'Italian', rating: 4.8, city: 'Ottawa', restaurant_id: 9 },
        { name: 'Delicatessen', cuisine: 'Delicatessen', rating: 4.5, city: 'Delicatessen', restaurant_id: 10 },
        { name: 'Knish Delight', cuisine: 'Delicatessen', rating: 4.9, city: 'Montreal', restaurant_id: 11 },
    ];
    return Restaurant.insertMany(dummyRestaurants)
        .then(() => {
            console.log('Dummy data inserted successfully!');
            mongoose.connection.close();
        })
        .catch((err) => {
            console.error('Error inserting dummy data:', err);
        });
}

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
