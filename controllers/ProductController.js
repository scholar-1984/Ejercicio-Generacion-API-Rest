const Product = require('../services/Product');

class ProductController {

static GetAll = async() => {
try 
{
    const products = await Product.Get();
    return products;

}catch(e) {
    throw e;
}
}

/*static Get = async() => {
    return Product.Get().then(p => {return p}).catch(e => {throw e});       
}*/


static Get = async(res) => {
    return Product.Get().then(p => { res.status(200).json(p)}).catch(e => { res.status(500).json({message: 'Error en el servidor'}) });       
}

Create = async(data, res) => {
   const newProduct = new Product(0, data.name, data.description, data.price, data.stock_quantity);
   return newProduct.Create()
   .then(p => { 
    const html = `
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mi Página</title>
      </head>
      <body>
        <h1>Producto Registrado</h1>
        <p>Bajo el ID ${p.lastInsertId}</p>
      </body>
    </html>
  `;
  res.send(html);})
    .catch(e => { res.status(500).json({message: 'Error en el servidor'}) });       
}

static List = async(res) => {
try{
    const products = await ProductController.GetAll();
    console.log(products);
    res.render('productList', { products: products });
}catch {
    res.status(500).json({message: "Error en el servidor"});
}
}

static Form = (res) => {
        res.render('productForm');
    }

}
module.exports = ProductController;