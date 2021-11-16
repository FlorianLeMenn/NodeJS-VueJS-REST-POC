// On configure nos variables d'environements
require('dotenv').config();

const express   = require('express');
const session   = require('express-session');
const cors      = require('cors');
const sanitizer = require('sanitizer');
const multer    = require('multer');
const app       = express();
const bodyParser = multer();
const router    = require('./app/router');
const sequelize = require('./app/database')
const PORT      = process.env.PORT || 3000;

// J'autorise le monde entier à accéder sur mon API
// Ce n'est pas recommandé
 app.use(cors());

// L'origine null est le cas où l'on essaye d'acceder à notre API depuis un fichier HTML sans serveur derrière
// const corsOptions = {
//   origin: 'null',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

// on utlise .none() pour dire qu'on attends pas de fichier, uniquement des inputs "classiques" !
app.use(bodyParser.none());

//Gestion du body parser: rendre clair les réponses des forms (post)
app.use(express.urlencoded({extended:true}));
//app.use(express.json());

//Gestion des sessions
// app.use(session({
//     saveUninitialized: true,
//     resave: true,
//     secret: process.env.SECRET_SESSION
// }));

//Gestion des variables à attacher aux views pour l'utiliser partout, middleware custom
// app.use((req, res, next) => {
//     if(req.session.login) res.locals.login = req.session.login
//     //on passe au prochaine middleware, sinon on reste bloqué dans celui-ci
//     next();
// });

// Creer les tables si elle n'existe pas: option force
// const init_BDD = async () => {
//     await sequelize.sync({force: true});
// } 
// init_BDD();

app.use((req, res, next) => {
    // Pour chaque Donnée dans mon req.body
    for(const key in req.body) {
    // Je sanitize chaque donnée de mon body
        req.body[key] = sanitizer.escape(req.body[key]);
    }

    // Pour chaque Donnée dans mon req.params
    for(const key in req.params) {
    // Je sanitize chaque donnée de mon body
        req.params[key] = sanitizer.escape(req.params[key]);
    }

    next();
});

// On dis à notre application express d'utiliser le router que l'on a récupérer de notre fichier router.js
app.use(router);

app.listen(PORT, () => {
    console.log(`Server start on http://localhost:${PORT}`);
});