const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema(
  {

    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      unique: true,
    },
    number_of_rooms: {
      type: Number,
      required: true,
    },
    number_of_beds: {
      type: Number,
      required: true,
    },
    amenities: {
      type: [String],
      enum: ['wifi', 'lounge', 'generator', 'air-condition', 'dstv'],
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
    categories: {
      type: String,
      enum: ['Suites', 'Standard', 'Condos'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('House', houseSchema);
