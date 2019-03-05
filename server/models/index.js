require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('debug', true); // permet dafficher le debug
mongoose.Promise = global.Promise; // permet d'utiliser les promesses globalement dans le code pour mongo
mongoose.connect('mongodb://localhost:27017/vote'); // ma database

module.exports.User = require('./user'); // export des methodes liées aux models
module.exports.Poll = require('./poll');

