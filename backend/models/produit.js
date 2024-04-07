const mongoose = require('mongoose');
 
const produitSchema = mongoose.Schema({
    nom_du_produit: {type: String, required: true},
    prix: {type: Number, required: true},
    urlimd: {type: String, required: true},
});

module.exports = mongoose.model('produit', produitSchema);
