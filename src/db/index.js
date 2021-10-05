const mongoose = require('mongoose');

module.exports = connect = async () => {
  try {
    await mongoose.connect(process.env.DB_LOCAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false
    });
    console.log('DB Connection Successful');
  } catch (e) {
    console.log('Error 💥 ', e);
  }
};
