const mongoose = require('mongoose');

const RefSchema = new mongoose.Schema({
  name: [{
    type: String,
    required: true
  }],
  count: {
      type: Number,
      required:true
  }
});

const Ref = mongoose.model('Ref', RefSchema);

module.exports = Ref;
