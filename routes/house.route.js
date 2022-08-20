const express = require('express');
const {
  addHouse,
  allHouse,
  isBooked,
  allBookedHouse,
} = require('../controllers/house.controller');
const { isAuth } = require('../middleware/isAuth');

const router = express.Router();

// create a new house
router.post('/create', isAuth, addHouse);
router.get('/all', allHouse);
router.put('/book', isAuth, isBooked);
router.get('/booked', isAuth, allBookedHouse);

module.exports = router;
