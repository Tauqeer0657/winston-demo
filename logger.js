const { createLogger, format, transports } = require('winston');
const getConnection = require('./db');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'app.log' })
  ]
});

// custom function to save logs in DB
async function logToDB(level, message) {
  try {
    const pool = await getConnection();
    await pool.request()
      .input('level', level)
      .input('message', message)
      .query('INSERT INTO Logs (level, message) VALUES (@level, @message)');
  } catch (err) {
    console.error('DB Logging Error:', err);
  }
}

// wrapper to log everywhere
function log(level, message) {
  logger.log({ level, message });
  logToDB(level, message);
}

module.exports = log;
