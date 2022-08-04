const House = require('../models/house.model');

exports.addHouse = async (req, res) => {
  const id = req.user._id;
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
