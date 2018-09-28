const express = require('express');
const morgan = require('morgan'); // use morgan for logging the events on the HTTP layer
const bodyParser = require('body-parser'); // use for parsing JSON data sent in HTTP requests
const {ShoppingList, Recipes} = require('./models'); // import the shopping list model

const jsonParser = bodyParser.json();
const app = express();

// log the http layer
app.use(morgan('common'));

// add some items to ShoppingList. This is normally done on the database side

ShoppingList.create('beans', 2);
ShoppingList.create('tomatoes', 3);

// retrieve items from the shopping list

app.get('/shopping-list', (req, res) => {
  res.json(ShoppingList.get());
});

// add items to the shopping list

app.post('/shopping-list', jsonParser, (req, res)=> {
  const requiredFields = ['name', 'budget'];
  for (let i=0; i<requiredFields.length; i++) {
    if (!(requiredFields[i] in req.body)) {
      const message = `Missing ${requiredFields[i]} in request body.`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  console.log(`Creating a shopping list item ${req.body.name}`);
  const item = ShoppingList.create(req.body.name, req.body.budget);
  return res.status(201).json(item);
});

// delete items from the shopping list

app.delete('/shopping-list/:id', (req, res) => {
  ShoppingList.delete(req.params.id);
  console.log(`Deleted shopping list item ${req.params.id}`);
  res.status(204).end();
});

// update items in the shopping list

app.put('/shopping-list/:id', jsonParser, (req, res) => {
  const requiredFields = ['id', 'name', 'budget'];
  for (let i=0; i<requiredFields.length; i++) {
    if (!(requiredFields[i] in req.body)) { // check if all of the required fields have been sent
      const message = `Missing ${requiredFields[i]} in request body`;
      console.error(message);
      res.status(400).send(message);
    }
  }

  if (req.params.id !== req.body.id) { // check if path id and body id match
    const message = `Request path id ${req.params.id} and request body id ${req.body.id} must match`;
    console.error(message);
    res.status(400).send(message);
  }

  console.log(`Updating shopping list item ${req.params.id}`);
  ShoppingList.update({
    id: req.params.id,
    name: req.body.name,
    budget: req.body.budget
  });

  return res.status(204).end();
});

// add a few recipes as examples

Recipes.create('chocolate milk', ['cocoa', 'milk', 'suger']);
Recipes.create('pancakes', ['flower', 'milk', 'water', 'eggs', 'milkyway']);

// retrieve recipes from the list

app.get('/recipes', (req, res) => {
  res.json(Recipes.get());
});

// add recipes to the list

app.post('/recipes', jsonParser, (req, res)=> {
  const requiredFields = ['name', 'ingredients'];
  for (let i=0; i<requiredFields.length; i++) {
    if (!(requiredFields[i] in req.body)) {
      const message = `Missing ${requiredFields[i]} in request body.`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  const item = Recipes.create(req.body.name, req.body.ingredients);
  return res.status(201).json(item);
});

// delete recipes

app.delete('/recipes/:id', (req, res) => {
  Recipes.delete(req.params.id);
  console.log(`Deleted recipe ${req.params.id}`);
  res.status(204).end();
});

// update recipes 

app.put('/recipes/:id', jsonParser, (req, res) => {
  const requiredFields = ['id', 'name', 'ingredients'];
  for (let i=0; i<requiredFields.length; i++) {
    if(!(requiredFields[i] in req.body)) {
      const message = `Missing ${requiredFields[i]} in request body`;
      console.error(message);
      res.status(400).send(message);
    }
  }

  if (req.params.id !== req.body.id) { // check if path id and body id match
    const message = `Request path id ${req.params.id} and request body id ${req.body.id} must match`;
    console.error(message);
    res.status(400).send(message);
  }

  console.log(`Updating recipes with item ${req.params.id}`);
  Recipes.update({
    id: req.params.id,
    name: req.body.name,
    ingredients: req.body.ingredients
  });

  return res.status(204).end();
});

// start the process at an envirnoment or 8080 port
app.listen(process.env.PORT || 8080, () => {
  console.log(`The process has started listening at port ${process.env.PORT || 8080}`);
});

