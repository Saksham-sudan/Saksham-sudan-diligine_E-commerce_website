// backend/routes/product.routes.js
const router = require('express').Router();
const Product = require('../models/product.model');

// GET ALL PRODUCTS
// @route   GET /api/products
router.route('/').get((req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err));
});

// GET SINGLE PRODUCT BY ID
// @route   GET /api/products/:id
router.route('/:id').get((req, res) => {
  Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;