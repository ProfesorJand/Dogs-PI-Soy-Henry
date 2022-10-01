const express = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const DogsMiddleware = require('../middlewares/dogs');
const TemperamentsMiddleware = require('../middlewares/temperaments.js');
const BredMiddleware = require("../middlewares/bred_for.js")
const BreedMiddleware = require("../middlewares/breed_group.js")

const router = express();

router.use(express.json());

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', DogsMiddleware);
router.use('/temperaments', TemperamentsMiddleware);
router.use('/bred_for', BredMiddleware);
router.use('/breed_group', BreedMiddleware)


module.exports = router;
