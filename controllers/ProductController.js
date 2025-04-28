const Product = require('../services/Product');

class ProductController {

  static GetAll = async (res) => {
    try {
      const products = await Product.Get();
      res.send(products)

    } catch (e) {
      throw e;
    }
  }

  /*static Get = async() => {
      return Product.Get().then(p => {return p}).catch(e => {throw e});       
  }*/


  static Get = async (res) => {
    return Product.Get().then(p => { res.status(200).json(p) }).catch(e => { res.status(500).json({ message: 'Error en el servidor' }) });
  }

  Create = async (data, res) => {
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
        res.send(html);
      })
      .catch(e => { res.status(500).json({ message: 'Error en el servidor' }) });
  }

  static List = async (res) => {
    try {
      const products = await ProductController.GetAll();
      console.log(products);
      res.render('productList', { products: products });
    } catch {
      res.status(500).json({ message: "Error en el servidor" });
    }
  }

  static Form = (res) => {
    res.render('productForm');
  }

  static Delete = async (res, a_eliminar) => {
    try {
      let resultado_operacion = `No existe el producto con id ${a_eliminar}`
      const ejecutado_con_exito = await Product.Delete(a_eliminar)
      if (ejecutado_con_exito) {
        resultado_operacion = `El producto con id ${a_eliminar} fue eliminado exitosamente!`
      }
      res.send({ "Resultado Operación": resultado_operacion })
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: "Error en el servidor" })
    }
  }

  static Update = async (res, a_actualizar, datos) => {
    try {
      let resultado_operacion = `No existe el producto con id ${a_actualizar}`
      const ejecutado_con_exito = await Product.Update(a_actualizar, datos)
      if (ejecutado_con_exito) {
        resultado_operacion = `El producto con id ${a_actualizar} fue actualizado exitosamente!`
      }
      res.send({ "Resultado Operación": resultado_operacion })
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: "Error en el servidor" })
    }

  }

  static Find = async (res, a_encontrar) => {
    try {
      let resultado_operacion = `No existe el producto con id ${a_encontrar}`
      const producto_buscado = await Product.Find(a_encontrar)
      if (producto_buscado === null) {
        res.send({ "Resultado Operación": resultado_operacion })
      }
      else {
        res.send(producto_buscado)
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: "Error en el servidor" })
    }
  }
}


module.exports = ProductController;