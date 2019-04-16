require('dotenv').config();
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');

// middlewares
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


// my own middl
const db = require('./models');
const handle = require('./handlers/');
const routes = require('./routes/');

const app = express();
const port = process.env.PORT;

app.use(helmet());
app.use(cors());
app.use(bodyParser.json())
app.use(compression()); //Compress all routes
app.use(express.static(path.join(__dirname, 'build')))

app.use('/api/auth', routes.auth);
app.use('/api/polls', routes.poll);
app.use('/api/contract', routes.contract);

app.use(handle.notFound);
app.use(handle.errors);


app.listen(port, console.log(`Server started at ${port}`));
