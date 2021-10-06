const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const getDatabaseUri = () => {
  const nodeEnv = process.env.NODE_ENV;
  const [prod, dev] = [process.env.DB_PROD, process.env.DB_LOCAL];
  switch (nodeEnv) {
    case 'production':
    case 'prod':
      return prod;
    case 'dev':
    case 'development':
      return dev;
    default:
      throw new Error('Node Env not set');
  }
};

class Database {
  connect(dbURI, cb = () => {}) {
    try {
      mongoose.connect(dbURI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
      mongoose.connection.once('open', async () => {
        console.log('database connected');
        cb();
      });
    } catch (error) {
      console.error(error);
    }
  }

  getModels() {
    let dbModels = {};
    const modelsFolder = __dirname + '/models';

    const models = fs.readdirSync(modelsFolder);

    models.forEach((file) => {
      const model = require(path.join(modelsFolder, file));
      dbModels[model.modelName] = model;
    });
    return dbModels;
  }
}

const dbURI = getDatabaseUri();
const db = new Database(dbURI);

module.exports = {
  connectDatabase: db.connect.bind(null, dbURI),
  ...db.getModels(),
};
