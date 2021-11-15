// On configure nos variables d'environements
require('dotenv').config();

const express   = require('express');
const session   = require('express-session');
const app       = express();
const router    = require('./app/router');
const PORT      = process.env.PORT || 3000;

//Gestion du body parser: rendre clair les réponses des forms (post)
app.use(express.urlencoded({extended:true}));
//app.use(express.json());

//Gestion des sessions
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: process.env.SECRET_SESSION
}));

//Gestion des variables à attacher aux views pour l'utiliser partout, middleware custom
app.use((req, res, next) => {
    if(req.session.login) res.locals.login = req.session.login
    //on passe au prochaine middleware, sinon on reste bloqué dans celui-ci
    next();
});

// On dis à notre application express d'utiliser le router que l'on a récupérer de notre fichier router.js
app.use(router);

app.listen(PORT, () => {
    console.log(`Server start on http://localhost:${PORT}`);
});