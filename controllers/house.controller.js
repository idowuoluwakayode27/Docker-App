const House = require('../models/house.model');
const User = require('../models/user.model');

exports.addHouse = async (req, res) => {
  const id = req.user._id;

  // check if user exist in database
  const user = await User.findOne({ userId: id });

  // Authorization
  if (user.role !== 'admin') {
    return res
      .status(401)
      .json({ message: 'You are not authorized to add a house' });
  }
  const {
    userId,
    name,
    address,
    number_of_rooms,
    number_of_beds,
    amenities,
    isBooked,
  } = req.body;
  try {
    const house = await House.create({
      name,
      address,
      number_of_rooms,
      number_of_beds,
      amenities,
      isBooked,
      userId: id,
    });

    return res.status(201).json(house);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.allHouse = async (req, res) => {
  try {
    const q = req.query.name;

    //destructured req.query
    const { page, limit } = req.query; // const page = req.query.page or const limit = req.query.limit
    const houses = await House.find()
      .sort({ createdAt: 1 })
      .skip((page - 1) * limit) // 0 * 5 // skip 0
      .limit(limit * 1);
    return res.status(200).json({ count: houses.length, data: houses });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.isBooked = async (req, res) => {
  try {
    const id = req.user._id;
    const book = await House.findOneAndUpdate(
      { userId: id },
      {
        isBooked: true,
      },
      { new: true }
    );
    return res.status(200).json(book);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.allBookedHouse = async (req, res) => {
  try {
    const id = req.user._id;
    const user = await User.findOne({ _id: id });
    console.log(user);

    if (user.role !== 'admin') {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const bookedHouse = await House.find({ isBooked: true });
    return res.status(200).json(bookedHouse);
  } catch (error) {
    console.log(error);
  }
};
