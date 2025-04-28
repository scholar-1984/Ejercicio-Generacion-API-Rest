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
static Delete = async(a_borrar) =>{
    try{
    const cn = await Database.connect()
    const sql_borrar = "DELETE FROM products WHERE product_id = ? LIMIT 1"
    const registro_a_borrar = [a_borrar]
    const [resultado, campos] = await cn.execute(sql_borrar,registro_a_borrar)
    if (resultado.affectedRows === 1){
        return true
    }
    else{
    return false
    }
    //console.log(`SE EJECUTO UNA SENTENCIA DELETE EL RESULTADO FUE: ${resultado.affectedRows} LOS CAMPOS: ${campos}`)
    }
    catch (err) {
        console.log(err)
    }
}
}
module.exports = Product;