const express = require('express');
const router = express.Router();

const mainController = require('./app/controllers/mainController');
const cartController= require('./app/controllers/cartController');
const contactController= require('./app/controllers/contactController');
//const authController = require("./app/controllers/authController.js");

router.get('/', mainController.homePage);
router.get('/article/:id', mainController.articlePage);
router.get('/catalog', mainController.catalogPage);
router.get('/articles', mainController.articlesPage);
router.get('/shop', mainController.shopPage);
router.get('/category/:categoryId', mainController.searchPage);
router.post('/add-to-cart', cartController.addToCart);
router.get('/cart', cartController.displayCart);
router.post('/remove-from-cart', cartController.removeFromCart);
router.get('/contact', contactController.contactForm); 
router.post('/contact', contactController.submitContactForm); 

module.exports = router;