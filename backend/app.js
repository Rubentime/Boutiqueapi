const express = require('express');
const mongoose = require('mongoose');
const trucRouter = require('./routes.js/truc');
const authRouter = require('./routes.js/auth');

mongoose.connect('mongodb://localhost:27017/myconnect',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (req.method === 'OPTIONS') {
      res.sendStatus(200); 
  } else {
      next();
  }
});
 
app.use('/api/truc', trucRouter);
app.use('/api/auth', authRouter);
module.exports = app;