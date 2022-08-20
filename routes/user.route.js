const express = require('express');
const {
  userSignup,
  userLogin,
  allHouses,
  getSingleHouseById,
  bookHouse,
  allBookedHouse,
  switchAdmin,
} = require('../controllers/user.controlller');

const router = express.Router();

// signup
router.post('/signup', userSignup);
// login
router.post('/login', userLogin);

// view all house
router.get('/houses', allHouses);

// view single house by id
router.get('/house/:id', getSingleHouseById);

// book a house
router.put('/house/book/:id', bookHouse);

// get all booked house
router.get('/booked', allBookedHouse);

// change to admin
router.put('/admin/:id', switchAdmin);

module.exports = router;
