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
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    Create = async () => {
        try {
            const cn = await Database.connect();
            const sql = 'INSERT INTO products (name, description, price, stock_quantity) VALUES(?, ?, ?, ?);';
            const values = [this.#name, this.#description, this.#price, this.#stock_quantity];
            const [result, fields] = await cn.execute(sql, values);
            return { lastInsertId: result.insertId };
        } catch (err) {
            console.log(err);
        }

    }
    static Delete = async (a_borrar) => {
        try {
            const cn = await Database.connect()
            const sql_borrar = "DELETE FROM products WHERE product_id = ? LIMIT 1"
            const [resultado, campos] = await cn.execute(sql_borrar, [a_borrar])
            if (resultado.affectedRows === 1) {
                return true
            }
            else {
                return false
            }
        }
        catch (err) {
            console.log(err)
            throw (err)
        }
    }
    static Update = async (a_actualizar, datos) => {
        try {
            const cn = await Database.connect()
            const sql_actualizar = "UPDATE products \
            SET name=?, description=?, price=?, stock_quantity=? \
            WHERE product_id=?"
            const valores = [datos.name, datos.description, datos.price, datos.stock_quantity, a_actualizar]
            const [resultado, campos] = await cn.execute(sql_actualizar, valores)
            if (resultado.affectedRows === 1) {
                return true
            }
            else {
                return false
            }
        }
        catch (err) {
            console.log(err)
            throw (err)
        }
    }
    static Find = async (a_encontrar) => {
        try {
            const cn = await Database.connect()
            const sql_encontrar = "SELECT * FROM products WHERE product_id = ?"
            const [resultado, campos] = await cn.execute(sql_encontrar, [a_encontrar])
            if (resultado.length === 0) {
                return null
            }
            else {
                return resultado[0]
            }
        }
        catch (err) {
            console.log(err)
            throw (err)
        }
    }
}
module.exports = Product;