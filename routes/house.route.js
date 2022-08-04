const express = require('express');
const { addHouse } = require('../controllers/house.controller');
const { isAuth } = require('../middleware/isAuth');

const router = express.Router();

// create a new house
router.post('/create', isAuth, addHouse);
module.exports = router;
