const Produit = require('../models/produit');

exports.ajouterProduits = (req, res, next) => {
    delete req.body._id;
    const produit = new Produit({
      ...req.body
    });
    produit.save()
      .then(() => res.status(201).json({ message: 'produit enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.recupone = (req, res, next) => {
    Produit.findOne({ _id: req.params.id })
        .then(produit => res.status(200).json({ produit }))
        .catch(error => res.status(400).json({ error }));
};


exports.recupall = (req, res, next) => {
    Produit.find()
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(400).json({ error }));
};

exports.modifier = (req, res, next) => {
    Produit.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };

  exports.supprimer = (req, res, next) => {
    Produit.deleteOne({_id: req.params.id})
      .then(produit => res.status(200).json({message:"obj suppeo" }))
      .catch(error => res.status(400).json({ error }));
  };