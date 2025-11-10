const mongoose = require('mongoose');
require('dotenv').config(); // Make sure this is at the top

const productsData = require('./data/products');
const Product = require('./models/product.model');

// Connect to MongoDB
const uri = process.env.MONGO_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB connection established for seeder");
});

const importData = async () => {
  try {
    // 1. Clear existing data
    await Product.deleteMany({});
    console.log('Data cleared...');

    // 2. Insert new data
    await Product.insertMany(productsData);
    console.log('Data imported successfully!');
    
    process.exit(); // Exit the script
  } catch (error) {
    console.error('Error with data import:', error);
    process.exit(1); // Exit with failure
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany({});
    console.log('Data destroyed successfully!');
    process.exit();
  } catch (error) {
    console.error('Error destroying data:', error);
    process.exit(1);
  }
};

// This allows you to run the script from the command line
// e.g., node backend/seeder.js -import
if (process.argv[2] === '-import') {
  importData();
} else if (process.argv[2] === '-destroy') {
  destroyData();
} else {
  console.log('Please specify -import or -destroy flag');
  mongoose.disconnect();
  process.exit();
}