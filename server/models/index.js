require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('debug', true); // permet dafficher le debug
mongoose.Promise = global.Promise; // permet d'utiliser les promesses globalement
mongoose.connect('mongodb://localhost:27017/vote');

module.exports.User = require('./user');
module.exports.Poll = require('./poll');

