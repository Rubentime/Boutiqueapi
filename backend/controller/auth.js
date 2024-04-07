const Auth = require('../models/auth');
const bcript = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.inscription = (req, res, next) =>{
    bcript.hash(req.body.password, 10)
        .then(hash => {
            const auth = new Auth ({
                email: req.body.email,
                mdp: hash
            });
            auth.save()
                .then(() => res.status(201).json({message: 'bien enregistré'}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

exports.connexion = (req, res, next) => {
    Auth.findOne({email: req.body.email})
        .then(auth => {
            if(!auth){
                return res.status(401).json({message: 'paire non retrouvé'});
            }
            bcript.compare(req.body.password, auth.mdp)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({message: 'paire non retrouvé'});
                    }
                    res.status(200).json({
                        authId: auth._id,
                        token: jwt.sign(
                            {authId: auth._id},
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn: '24h'}
                        )
                    });                   
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};
