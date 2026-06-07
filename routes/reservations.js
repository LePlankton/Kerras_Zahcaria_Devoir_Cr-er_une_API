const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// Obtenir toutes les réservations

router.get('/:id/reservations', async (req, res) => {
    try {
        const reservations = await Reservation.find({ catwayNumber: req.params.id });
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Créer une nouvelle réservation

router.post('/:id/reservations', async (req, res) => {
    const reservation = new Reservation({
        catwayNumber: req.params.id,
        clientName: req.body.clientName,
        boatName: req.body.boatName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
    });
    try {        
        const newReservation = await reservation.save();
        res.status(201).json(newReservation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Obtenir une réservation spécifique

router.get('/:id/reservations/:reservationId', async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.reservationId);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.json(reservation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Modifier une réservation existante

router.put('/:id/reservations/:reservationId', async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.reservationId);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        reservation.clientName = req.body.clientName || reservation.clientName;
        reservation.boatName = req.body.boatName || reservation.boatName;
        reservation.startDate = req.body.startDate || reservation.startDate;
        reservation.endDate = req.body.endDate || reservation.endDate;
        const updatedReservation = await reservation.save();
        res.json(updatedReservation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Supprimer une réservation

router.delete('/:id/reservations/:reservationId', async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.reservationId);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        await Reservation.findByIdAndDelete(req.params.reservationId);
        res.json({ message: 'Reservation deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;