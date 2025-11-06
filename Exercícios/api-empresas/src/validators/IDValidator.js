const mongoose = require('mongoose');

module.exports = {
  isValidObjectId: (id) => mongoose.Types.ObjectId.isValid(id)
};
