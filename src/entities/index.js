const { Booking, bookingConstants } = require('./booking');
const { userConstants } = require('./user');
module.exports = {
  Booking
};

module.exports.entityConstants = {
  bookingConstants,
  userConstants
};
// this is example file If I need to setup some enums or entities I can do it here