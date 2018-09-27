const express = require('express');
const morgan = require('morgan'); // use morgan for logging the events on the HTTP layer
const bodyParser = require('body-parser'); // use for parsing JSON data sent in HTTP requests
const {ShoppingList} = require('./models'); // import the shopping list model

const jsonParser = bodyParser.json();
const app = express();

app.use(morgan('common'));

//add some items to ShoppingList. This is normally done on the database side

ShoppingList.create('beans', 2);
ShoppingList.create('tomatoes', 3);
ShoppingList.create('peppers', 4);

app.get('/shopping-list', (req, res) => {
  res.json(ShoppingList.get());
});

// start the process at an envirnoment or 8080 port
app.listen(process.env.PORT || 8080, () => {
  console.log(`The process has started listening at port ${process.env.PORT || 8080}`);
});

