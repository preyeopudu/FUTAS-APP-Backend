const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');
const dotenv = require('dotenv');

// Adding Configsuration file
dotenv.config();

// Imports
const route = require('./src/routes');
const db = require('./src/db');
const CustomError = require('./src/utils/CustomError');
const expressGlobalErrorHandlingMiddleware = require('./src/middlewares/expressErrorHandling');

// Express app
const app = express();

// Connect to db
// db();

// Express Configuration
app.enable('trust proxy');
//app.disable('x-powered-by');

// Parsing incoming body data
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cors());

// Logging Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Http Header
app.use(helmet());

// Mongoose sanitize
app.use(mongoSanitize());

// Xss attack
app.use(xss());

// Mounting routes
app.use(route);

// 404 Not found error
app.all('*', (req, res, next) => {
  const message = `${req.originalUrl} doesn't exist.`;
  next(new CustomError(message, 400));
});

// Express global error handling middleware
app.use(expressGlobalErrorHandlingMiddleware);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Now Listening to port ${port}`);
});
