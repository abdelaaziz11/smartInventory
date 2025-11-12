const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { authLimiter, apiLimiter } = require('./middlewares/rateLimit');
const morgan = require('morgan');
const config = require('./config/config');

const authRouter = require('./routes/auth.routes')
const productsRouter = require('./routes/products.routes');
const ordersRouter = require('./routes/orders.routes');

//const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json());
//app.use(logger);

app.use('/api', apiLimiter);
app.use('/api/auth', authLimiter, authRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() });
});
app.use(errorHandler);

if (config.env === 'development') {
  app.use(morgan('dev')); // format court et coloré
} else {
  app.use(morgan('combined')); // format complet (Apache-like)
}

module.exports = app;
