
// Charger les variables d'environnement
require('dotenv').config();


const sessionMiddleware = require("./app/middlewares/sessionMiddleware.js");

// Importe les dépendances tiers
const express = require('express');

// Importe les dépendances locales
const router = require('./router');

// Creation d'une application Express
const app = express();  

// Middleware pour parser les données URL-encoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Ajout pour parser les données JSON

app.use(sessionMiddleware);


// Mise en place du moteur de rendu
app.set("view engine", "ejs");
app.set("views", "./app/views");

// Service d'un dossier "static"
app.use(express.static('public'));

// Configuration des routes de notre application
app.use(router);


// On démarre un serveur HTTP
const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
