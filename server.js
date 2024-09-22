const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');


app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working' });
  });   

router.post('/', appointmentController.createAppointment);
router.get('/', appointmentController.getAppointments);

module.exports = router;
