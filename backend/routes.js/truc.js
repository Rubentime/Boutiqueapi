const express = require('express');
const router = express.Router();
const authmid = require('../middleware/auth');
const trucCtrl = require('../controller/truc');

router.post('/',  trucCtrl.ajouterProduits);

router.put('/:id',  trucCtrl.modifier);

router.get('/',  trucCtrl.recupall);

router.delete('/:id',  trucCtrl.supprimer);

router.get('/:id',  trucCtrl.recupone);

module.exports  = router;
