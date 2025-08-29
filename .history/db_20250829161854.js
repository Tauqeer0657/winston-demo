const sql = require('mssql');

const config = {
  user: 'your_username',
  password: 'your_password',
  server: 'localhost', // or server name
  database: 'your_db',
  options: {
    encrypt: false, // true if using Azure
    trustServerCertificate: true
  }
};

async function getConnection() {
  try {
    let pool = await sql.connect(config);
    return pool;
  } catch (err) {
    console.error('DB Connection Failed:', err);
  }
}

module.exports = getConnection;
