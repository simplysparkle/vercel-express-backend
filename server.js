const express = require('express');
   const appointmentsRouter = require('./src/routes/appointments');
   require('dotenv').config();

   const app = express();
   const port = process.env.PORT || 3000;

   app.use(express.json());

   app.use('/api/appointments', appointmentsRouter);

   app.get('/', (req, res) => {
     res.json({ message: 'Welcome to the Appointments API!' });
   });

   app.get('/nithish', (req, res) => {
    res.json({ message: 'Hi nithish to the Appointments API!' });
  });


   app.listen(port, () => {
     console.log(`Server running on port ${port}`);
   });

   module.exports = app;