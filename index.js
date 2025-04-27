const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000
const ProductRoute = require('./routes/ProductRoute');

app.use(express.json());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/', ProductRoute);
app.set('view engine', 'pug');
app.set('views', './views');

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})