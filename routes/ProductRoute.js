const ProductController = require('../controllers/ProductController');
const express = require('express');
const router = express.Router();

router.get('/products', (req, res) => {
    ProductController.Get(res);
})
router.post('/products', (req, res) => {
    const newProductController = new ProductController();
    newProductController.Create(req.body, res);
})
router.get('/products/list', async (req, res) => { 
    ProductController.List(res);
   })
router.get('/products/create', async (req, res) => { 
    ProductController.Form(res);
   })
module.exports = router;