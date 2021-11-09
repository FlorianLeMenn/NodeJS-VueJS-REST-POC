// On configure nos variables d'environements
require('dotenv').config();

const express   = require('express');
const session   = require('express-session');
const app       = express();
const router    = require('./app/router');
const PORT      = process.env.PORT || 3000;

//Gestion des session
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: 'secret phrase'
}));

// On dis à notre application express d'utiliser le router que l'on a récupérer de notre fichier router.js
app.use(router);

app.listen(PORT, () => {
    console.log(`Server start on http://localhost:${PORT}`);
});