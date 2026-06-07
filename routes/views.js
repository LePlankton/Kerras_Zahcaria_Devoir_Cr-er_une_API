const express = require('express');
const router = express.Router();
const Catway = require('../models/Catways');

// Page de login
router.get('/login', (req, res) => {
    res.render('login');
});

// Page dashboard
router.get('/dashboard', async (req, res) => {
    if (!req.session.token) {
        return res.redirect('/login');
    }
    const catways = await Catway.find();
    res.render('dashboard', { catways });
});

// Page des catways
router.get('/dashboard/catways', async (req, res) => {
    if (!req.session.token) {
        return res.redirect('/login');
    }
    const catways = await Catway.find();
    res.render('catways', { catways });
});

module.exports = router;