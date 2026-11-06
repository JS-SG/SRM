const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/env');
const routes = require('./routes');
const errorHandler = require('./middlewares/error.middleware');
const ApiResponse = require('./utils/apiResponse');

const app = express();

// Middlewares
app.use(cors({
  origin: config.CLIENT_URL || '*',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (config.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health Check
app.get('/api/health', (req, res) => {
  return ApiResponse.success(res, {
    status: 'UP',
    timestamp: new Date().toISOString(),
    env: config.NODE_ENV,
  }, 'SRM API Service is healthy');
});

// API Routes
app.use('/api', routes);

// 404 Handler
app.use((req, res) => {
  return ApiResponse.notFound(res, `Route ${req.method} ${req.originalUrl} not found`);
});

// Central Error Handler
app.use(errorHandler);

module.exports = app;
