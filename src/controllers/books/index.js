const getBooksController = require('./getBooksController.js');

module.exports = (dependencies) => {
  return {
    getBooksController: getBooksController(dependencies)
  };
};
