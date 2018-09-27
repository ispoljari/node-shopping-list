const express = require('express');
const app = express();

const morgan = require('morgan'); // use morgan for logging the events on the HTTP layer
const bodyParser = require('body-parser'); // use for parsing JSON data sent in HTTP requests

app.use(morgan('common'));

app.get('/', (req, res) => {
  res.send('Hey. I received an HTTP get request!');
});

// start the process at an envirnoment or 8080 port
app.listen(process.env.PORT || 8080, () => {
  console.log(`The process has started listening at port ${process.env.PORT || 8080}`);
});

