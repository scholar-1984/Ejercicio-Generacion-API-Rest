const mysql = require('mysql2/promise');
class Database {
    static connect = async() => {

   try {
        const cn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'store',
        port: 3306,
        password: '',
    });
    return cn;
   } catch (err) {
    console.log(err);
    }
}
}

module.exports = Database;