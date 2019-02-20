const express = require('express');
const handle = require('./handlers//');
const app = express();
const port = 4000;

app.get('/', (req, res) => res.json({hello: 'world'}) );
// app.get('/api/login')

app.use();

app.use(handle.errors);


app.listen(port, console.log(`Server started at ${port}`));
