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

router.post('/products/create', async (req, res) => {
    const newProductController = new ProductController()
    newProductController.Create(req.body, res)
})

router.put("/products/update/:product_id", async (req, res) => {
    ProductController.Update(res, req.params.product_id, req.body)
})

router.get("/products/find/:product_id", async (req, res) => {
    ProductController.Find(res, req.params.product_id)
})

router.get("/products/get", async (req, res) => {
    ProductController.GetAll(res)
})

router.delete("/products/delete/:product_id", async (req, res) => {
    ProductController.Delete(res, req.params.product_id)
})




module.exports = router;