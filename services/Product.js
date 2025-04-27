const Database = require('../database');

class Product {

    #product_id;
    #name;
    #description;
    #price;
    #stock_quantity;

constructor(id, name, description, price, stock) {
    this.#product_id = id;
    this.#name = name;
    this.#description = description;
    this.#price = price;
    this.#stock_quantity = stock;
}

static Get = async () => {
try {
    const cn = await Database.connect();
    const sql = 'SELECT * FROM products ORDER BY name';
    const [rows, fields] = await cn.query(sql);
    return rows
}catch(e) {
    console.log(e);
    throw e;
} 
}

Create = async() => {
    try {
        const cn = await Database.connect();
        const sql = 'INSERT INTO products (name, description, price, stock_quantity) VALUES(?, ?, ?, ?);';
        const values = [this.#name, this.#description, this.#price, this.#stock_quantity];
        const [result, fields] = await cn.execute(sql, values);
         return {lastInsertId: result.insertId};
      } catch (err) {
        console.log(err);
      }

}
}
module.exports = Product;