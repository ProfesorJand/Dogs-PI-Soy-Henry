const express = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const DogsMiddleware = require('../middlewares/dogs');
const TemperamentsMiddleware = require('../middlewares/temperaments.js');

const router = express();

router.use(express.json());

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', DogsMiddleware);
router.use('/temperaments', TemperamentsMiddleware);


module.exports = router;
