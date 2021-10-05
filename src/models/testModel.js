const { Schema, model } = require('mongoose');

const testSchema = Schema({
  test: String,
});

const Test = model('Test', testSchema);

module.exports = Test;
