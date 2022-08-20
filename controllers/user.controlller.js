const User = require('../models/user.model');
const House = require('../models/house.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../mail/email-sender');

exports.userSignup = async (req, res) => {
  const { password, email, name } = req.body;
  try {
    //  hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    // await sendEmail({
    //   email: user.email,
    //   subject: `${user.name} Registered Successfully`,
    //   message: `<div>
    //       <h1>HELLO ${user.name}</h1>
    //       <h2>You just registered successfully</h2>
    //   </div>`,
    // });
    return res
      .status(201)
      .json({ message: 'User created successfully', userId: user._id });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error.message, message: 'internal server error' });
  }
};

exports.userLogin = async (req, res) => {
  const { password, email } = req.body;
  try {
    // validation
    if (!(password && email)) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    // check if user exist in database
    const checkUser = await User.findOne({ email: email });

    // if user doesn't exist throw error
    if (!checkUser) {
      return res.status(404).json({ message: 'user not found' });
    }

    // if user exist in database, check if user password is correct
    const checkPassword = await bcrypt.compare(password, checkUser.password);

    // if user password is not correct throw error ==> invalid credentials
    if (!checkPassword) {
      return res.status(400).json({ message: 'invalid credentials' });
    }

    // if user password is correct tokenize the payload
    const payload = {
      _id: checkUser._id,
    };

    const token = await jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '2d',
    });

    // store token in cookie ====> web browser local storage
    res.cookie('access-token', token);
    return res
      .status(202)
      .json({ message: 'User logged in successfully', token: token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error.message, message: 'internal server error' });
  }
};

// view all houses by user

exports.allHouses = async (req, res) => {
  try {
    const houses = await House.find();
    const dataInfo = {
      count: `${houses.length} houses available`,
      houses,
    };
    return res.status(200).json(dataInfo);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error.message, message: 'internal server error' });
  }
};

exports.getSingleHouseById = async (req, res) => {
  try {
    const id = req.params.id;
    const house = await House.find({ userId: id }).populate('userId');
    const dataInfo = {
      count: house.length,
      house,
    };
    return res.status(200).json(dataInfo);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error.message, message: 'internal server error' });
  }
};

exports.bookHouse = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      throw new Error('user does not exist'); // assignment read about throw new Error
    }
    const bookHouse = await House.findOneAndUpdate(
      {
        userId: id,
      },
      {
        isBooked: true,
      },
      {
        new: true,
      }
    );

    return res.status(200).json(bookHouse);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error.message, message: 'internal server error' });
  }
};

exports.allBookedHouse = async (req, res) => {
  try {
    const booked_house = await House.find({ isBooked: true }); // query
    const dataInfo = {
      count: booked_house.length,
      booked_house,
    };
    return res.status(200).json(dataInfo);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error.message.kind, message: 'internal server error' });
  }
};

exports.switchAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOneAndUpdate(
      id,
      {
        role: 'admin',
      },
      { new: true }
    );
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error.message.kind, message: 'internal server error' });
  }
};
