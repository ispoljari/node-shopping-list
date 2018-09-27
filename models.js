const uuid = require('uuid');

// This module provides volatile storage, using a ShoppingList and Recipes model. Every time the app stops, the storage get's erased. Normally, the data should be stored in a database to achieve persistence.

function StorageException(message) {
  this.message = message;
  this.name = "StorageException";
}

const ShoppingList = {
  create: function(name, budget) {
    console.log('Creating a new shopping list item.');
    const item = {
      name: name,
      id: uuid.v4(),
      budget: budget
    };
    this.items[item.id] = item;
    return item;
  },
  get: function() {
    console.log('Retrieving shopping list items.');
    return Object.keys(this.items).map(key => this.items[key]);
  },
  delete: function(id) {
    console.log(`Deleting shopping list item ${id}`);
    delete this.items[id];
  },
  update: function(updatedItem) {
    console.log(`Deleting shopping list item ${updatedItem.id}`);
    const {id} = updatedItem;
    if (!(id in this.items)) {
      throw StorageException (
        `Can't update item ${id} because it doesn't exist.`
      );
    }
    this.items[updatedItem.id] = updatedItem;
    return updatedItem;
  }
};

function createShoppingList() {
  const storage = Object.create(ShoppingList);
  storage.items = {};
  return storage;
}

const Recipes = {
  create: function(name, ingredients) {
    console.log('Creating a new recipe');
    const item = {
      name: name,
      id: uuid.v4(),
      ingredients: ingredients
    };
    this.items[item.id] = item;
    return item;
  },
  get: function() {
    console.log('Retreiving recipes');
    return Object.keys(this.items).map(key => this.items[key]);
  },
  delete: function(itemId) {
    console.log(`Deleting recipe with id \`${itemId}\``);
    delete this.items[itemId];
  },
  update: function(updatedItem) {
    console.log(`Updating recipe with id \`${updatedItem.id}\``);
    const {id} = updatedItem;
    if (!(id in this.items)) {
      throw StorageException(
        `Can't update item \`${id}\` because doesn't exist.`)
    }
    this.items[updatedItem.id] = updatedItem;
    return updatedItem;
  }
};


function createRecipes() {
  const storage = Object.create(Recipes);
  storage.items = {};
  return storage;
}

module.exports = {
  ShoppingList: createShoppingList(),
  Recipes: createRecipes()
};