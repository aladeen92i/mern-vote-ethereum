require('dotenv').config();


// middlewares
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// my own middl
const db = require('./models');
const handle = require('./handlers/');
const routes = require('./routes');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json())

app.use('/api/auth', routes.auth);
app.use('/api/polls', routes.poll);

app.use(handle.notFound);
app.use(handle.errors);


app.listen(port, console.log(`Server started at ${port}`));
