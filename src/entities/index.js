const { Booking, bookingConstants } = require('./booking');
const { userConstants } = require('./user');
module.exports = {
  Booking
};

module.exports.entityConstants = {
  bookingConstants,
  userConstants
};
