const express = require('express');
const router = express.Router();
const Catway = require('../models/Catways');

// Obtenir tous les catways

router.get('/', async (req, res) => {
  try {
    const catways = await Catway.find();
    res.json(catways);
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
  try {
    // Récupérer l'ID depuis l'URL
    const id = req.params.id;

    // Cherche le catway dont le catwayNumber correspond à l'ID
    const catway = await Catway.findOne({ catwayNumber: id });
    
    // Si aucun catway n'est trouvé, retourner une erreur 404
    if (!catway) {
      return res.status(404).json({ message: 'Catway not found' });
    }

    res.json(catway);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Créer un nouveau catway

router.post('/', async (req, res) => {
  const catway = new Catway({
    catwayNumber: req.body.catwayNumber,
    catwayType: req.body.catwayType,
    catwayState: req.body.catwayState,
  });
  try {
    // Vérifier si un catway avec le même catwayNumber existe déjà
    const existingCatway = await Catway.findOne({ catwayNumber: catway.catwayNumber });
    if (existingCatway) {
      return res.status(400).json({ message: 'A catway with this catwayNumber already exists' });
    }
    // Enregistrer le nouveau catway dans la base de données
    const newCatway = await catway.save();
    res.status(201).json(newCatway);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Modifier un catway existant

router.put('/:id', async (req, res) => {
  try {
    const catway = await Catway.findOne({ catwayNumber: req.params.id });
    if (!catway) {
      return res.status(404).json({ message: 'Catway not found' });
    }

    // Mettre à jour les propriétés du catway
    if (req.body.catwayState != null) {
      catway.catwayState = req.body.catwayState;
    }

    // Enregistrer les modifications dans la base de données
    const updatedCatway = await catway.save();
    res.json(updatedCatway);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Supprimer un catway

router.delete('/:id', async (req, res) => {
    try {
        const catway = await Catway.findOne({ catwayNumber: req.params.id });
        if (!catway) {
            return res.status(404).json({ message: 'Catway not found' });
        }
        await Catway.findOneAndDelete({ catwayNumber: req.params.id });
        res.json({ message: 'Catway deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;