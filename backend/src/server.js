const app = require('./app');
const config = require('./config/env');
const prisma = require('./config/prisma');
const logger = require('./utils/logger');

const PORT = config.PORT || 5000;

async function startServer() {
  try {
    // Verify database connection
    await prisma.$connect();
    logger.info('Database connected successfully via Prisma');

    app.listen(PORT, () => {
      logger.info(`SRM Backend Server running on port ${PORT} [${config.NODE_ENV}]`);
      logger.info(`Health check available at http://localhost:${PORT}/api/health`);
    });
  } catch (err) {
    logger.error(`Database connection error: ${err.message}`);
    logger.warn('Starting server in offline database mode for development/diagnostics...');
    app.listen(PORT, () => {
      logger.info(`SRM Backend Server running on port ${PORT} [Database Offline]`);
    });
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

startServer();
