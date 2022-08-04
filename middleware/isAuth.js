const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token Is missing' });
    }

    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      throw new Error();
    }
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Token expired' });
  }
};
