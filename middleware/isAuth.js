const jwt = require('jsonwebtoken');
// const User = require('../models/user.model');

// Authentication
exports.isAuth = async (req, res, next) => {
  try {
    // 0      1
    // Bearer token
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token Is missing' });
    }

    const decoded = await jwt.verify(token, process.env.SECRET_KEY); // hikhvkkc,yx,ykxykxykx
    if (!decoded) {
      throw new Error();
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Token expired', error: error.message });
  }
};

exports.isAdminAuth = async (req, res, next) => {
  try {
    // 0      1
    // Bearer token
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token Is missing' });
    }

    const decoded = await jwt.verify(token, process.env.SECRET_KEY); // hikhvkkc,yx,ykxykxykx
    if (!decoded) {
      throw new Error();
    }
    req.admin = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Token expired', error: error.message });
  }
};
