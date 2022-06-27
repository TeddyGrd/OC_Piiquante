const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const userRoutes = require('./routes/user');


mongoose.connect('mongodb+srv://teddy:teddy76@coursopenclassroommongo.iuels6o.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// app.use((req, res, next) => {
//     console.log('Requête reçue !');
//     next();
// });

// app.use((req,res,next) => {
//     res.status(201);
//     next();
// });

// app.use((req, res, next) => {
//     res.json({ message: 'Votre requête a bien été reçue !'});
//     next();
// });

// app.use((req,res, next) => {
//     console.log('Réponse envoyée avec succès !');
// });

app.use(bodyParser.json());

app.use('/api/auth', userRoutes);

module.exports = app;