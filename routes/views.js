const express = require('express');
const router = express.Router();
const Catway = require('../models/Catways');
const Reservation = require('../models/Reservation');
const User = require('../models/User');

// Page d'accueil / login
router.get('/', (req, res) => {
    res.render('index');
});

// Page dashboard
router.get('/dashboard', async (req, res) => {
    if (!req.session.token) return res.redirect('/');
    const catways = await Catway.find();
    const reservations = await Reservation.find();
    const user = req.session.user;
    res.render('dashboard', { catways, reservations, user });
});

// ===== CATWAYS =====

// Liste des catways
router.get('/dashboard/catways', async (req, res) => {
    if (!req.session.token) return res.redirect('/');
    const catways = await Catway.find();
    const user = req.session.user;
    res.render('catways', { catways, user });
});

// Formulaire création catway
router.get('/dashboard/catways/new', (req, res) => {
    if (!req.session.token) return res.redirect('/');
    res.render('catway-form', { catway: null, user: req.session.user });
});

// Créer un catway (POST)
router.post('/dashboard/catways', async (req, res) => {
    if (!req.session.token) return res.redirect('/');
    try {
        const catway = new Catway({
            catwayNumber: req.body.catwayNumber,
            catwayType: req.body.catwayType,
            catwayState: req.body.catwayState
        });
        await catway.save();
        res.redirect('/dashboard/catways');
    } catch (err) {
        res.render('catway-form', { catway: null, error: err.message, user: req.session.user });
    }
});

// Formulaire modification catway
router.get('/dashboard/catways/:id/edit', async (req, res) => {
    if (!req.session.token) return res.redirect('/');
    const catway = await Catway.findOne({ catwayNumber: req.params.id });
    res.render('catway-form', { catway, user: req.session.user });
});

// Modifier un catway (POST)
router.post('/dashboard/catways/:id/edit', async (req, res) => {
    if (!req.session.token) return res.redirect('/');
    await Catway.findOneAndUpdate(
        { catwayNumber: req.params.id },
        { catwayState: req.body.catwayState }
    );
    res.redirect('/dashboard/catways');
});

// Supprimer un catway (POST)
router.post('/dashboard/catways/:id/delete', async (req, res) => {
    if (!req.session.token) return res.redirect('/');
    await Catway.findOneAndDelete({ catwayNumber: req.params.id });
    res.redirect('/dashboard/catways');
});

// Détail d'un catway
router.get('/dashboard/catways/:id', async (req, res) => {
    if (!req.session.token) return res.redirect('/');
    const catway = await Catway.findOne({ catwayNumber: req.params.id });
    const reservations = await Reservation.find({ catwayNumber: req.params.id });
    res.render('catway-detail', { catway, reservations, user: req.session.user });
});

// ===== RÉSERVATIONS =====

// Liste des réservations
router.get('/dashboard/reservations', async (req, res) => {
    if (!req.session.token) return res.redirect('/');
    const reservations = await Reservation.find();
    const user = req.session.user;
    res.render('reservations', { reservations, user });
});

// Formulaire création réservation
router.get('/dashboard/reservations/new', (req, res) => {
    if (!req.session.token) return res.redirect('/');
    res.render('reservation-form', { reservation: null, user: req.session.user });
});

// Créer une réservation (POST)
router.post('/dashboard/reservations', async (req, res) => {
    if (!req.session.token) return res.redirect('/');
    try {
        const reservation = new Reservation({
            catwayNumber: req.body.catwayNumber,
            clientName: req.body.clientName,
            boatName: req.body.boatName,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        });
        await reservation.save();
        res.redirect('/dashboard/reservations');
    } catch (err) {
        res.render('reservation-form', { reservation: null, error: err.message, user: req.session.user });
    }
});

// Formulaire modification réservation
router.get('/dashboard/reservations/:id/edit', async (req, res) => {
    if (!req.session.token) return res.redirect('/');
    const reservation = await Reservation.findById(req.params.id);
    res.render('reservation-form', { reservation, user: req.session.user });
});

// Modifier une réservation (POST)
router.post('/dashboard/reservations/:id/edit', async (req, res) => {
    if (!req.session.token) return res.redirect('/');
    await Reservation.findByIdAndUpdate(req.params.id, {
        catwayNumber: req.body.catwayNumber,
        clientName: req.body.clientName,
        boatName: req.body.boatName,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    });
    res.redirect('/dashboard/reservations');
});

// Supprimer une réservation (POST)
router.post('/dashboard/reservations/:id/delete', async (req, res) => {
    if (!req.session.token) return res.redirect('/');
    await Reservation.findByIdAndDelete(req.params.id);
    res.redirect('/dashboard/reservations');
});

// ===== UTILISATEURS =====

// Liste des utilisateurs
router.get('/dashboard/users', async (req, res) => {
    if (!req.session.token) return res.redirect('/');
    const users = await User.find();
    const user = req.session.user;
    res.render('users', { users, user });
});

// Formulaire création utilisateur
router.get('/dashboard/users/new', (req, res) => {
    if (!req.session.token) return res.redirect('/');
    res.render('user-form', { editUser: null, user: req.session.user });
});

// Créer un utilisateur (POST)
router.post('/dashboard/users', async (req, res) => {
    if (!req.session.token) return res.redirect('/');
    const bcrypt = require('bcrypt');
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10)
        });
        await newUser.save();
        res.redirect('/dashboard/users');
    } catch (err) {
        res.render('user-form', { editUser: null, error: err.message, user: req.session.user });
    }
});

// Formulaire modification utilisateur
router.get('/dashboard/users/:email/edit', async (req, res) => {
    if (!req.session.token) return res.redirect('/');
    const editUser = await User.findOne({ email: req.params.email });
    res.render('user-form', { editUser, user: req.session.user });
});

// Modifier un utilisateur (POST)
router.post('/dashboard/users/:email/edit', async (req, res) => {
    if (!req.session.token) return res.redirect('/');
    const bcrypt = require('bcrypt');
    const update = {
        username: req.body.username,
        email: req.body.email
    };
    if (req.body.password) {
        update.password = await bcrypt.hash(req.body.password, 10);
    }
    await User.findOneAndUpdate({ email: req.params.email }, update);
    res.redirect('/dashboard/users');
});

// Supprimer un utilisateur (POST)
router.post('/dashboard/users/:email/delete', async (req, res) => {
    if (!req.session.token) return res.redirect('/');
    await User.findOneAndDelete({ email: req.params.email });
    res.redirect('/dashboard/users');
});

// Page documentation de l'API
router.get('/api-docs', (req, res) => {
    res.render('api-docs');
});

module.exports = router;
