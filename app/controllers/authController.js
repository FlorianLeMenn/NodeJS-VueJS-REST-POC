const { validate }      = require('email-validator');
const {compare, hash}   = require('bcrypt');
const { User }          = require('../models');

const auhtController = {
    signupPage: (req, res) => {
        //error first : redirection si l'utilisateur est bien connecté
        if (req.session.login) return res.redirect('/');
    },  

    loginPage: (req, res) => {
        //error first : redirection si l'utilisateur est bien connecté
        if (req.session.login) return res.redirect('/');
    },

    profilPage: (req, res) => {
        //error first : redirection si l'utilisateur n'est pas connecté
        if (!req.session.login) return res.redirect('/login');
    },

    signup: async(req, res) => {
        try {
            //1. reécupérer les données du formulaire
            const errors = [];
            const form   = req.body;
            //2. Vérifier que tous les champs obligatoire soient remplis + email valide
            if(!req.body.lastname || !req.body.firstname || !req.body.password || !req.body.passwordConfirm) errors.push("Les champs du formulaire n'ont pas été correctement remplis !");

            if(!validate(req.body.email)) errors.push("L'adresse email renseignée n'est pas correcte !");

            // 3. Vérifier que les deux mots de passes soient identiques
            if(req.body.password !== req.body.passwordConfirm) errors.push("Les deux mots de passe ne sont pas identiques !");

            if(errors.length > 0) return res.render('signup', {errors, values:req.body});
            //4. Vérifier que l'email est unique
            const user = await User.findOne({
                where: {
                    mail: form.email.toLowerCase()
                }
            });

            if (user) return res.redirect('/signup');
            
            //5. Enregistrer le user en base
            delete form.passwordConfirm; //supprimer les champs inutiles
            const dataUser = {
                mail: form.email,
                password: hashSync(form.password, 10),//On hash le mot de passe avant de l'enregistrer en base
                username: form.username,
                roles: ["ROLE_USER"]
            }
            const newUser = await User.create(dataUser);
            if(newUser) {
                //6. Redirect sur la home
                res.redirect('/login');
            }

        } catch(error) {
            console.error(error);
            res.status(500).json({error:'500'});
        }
    },

    login: async(req, res) => {
        try {
            const errors = [];
            const form   = req.body;
            //1. Vérifier si les champs sont vides
            if(!validate(form.email) || !form.password) return res.redirect('/login');
            if(errors.length > 0) return res.render('login', {errors, values:req.body});
            //2.Vérifier que l'utilisateur existe bien
            const user =  await User.findOne({
                where: {
                    mail:form.email,
                }
            });
    
            if (!user) return res.redirect('/login');
            //comparaison du mot de passe du formulaire avec celui de l'utilisateur en base
            const passValid =  await compare(form.password, user.password);
            if(!passValid) return res.redirect('/login');
    
            //3. Créer la variable (propriété) de session login, stocké coté serveur
            req.session.login = {
                id: user.id,
                email: user.mail,
                username: user.username,
                fullname: user.fullname,
                roles: user.roles,
            };
    
            res.redirect('/');
        }
        catch(error) {
            console.error(error);
            res.status(500).json({error:'500'});
        }
    },

    logout: (req, res) => {
        if(req.session.login) delete req.session.login;
        // on peut écrire ça comme ça : req.session.login = null;
        res.redirect('/');
    }
}

module.exports = auhtController;