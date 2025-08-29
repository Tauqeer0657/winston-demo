const sql = require('mssql');

const config = {
    user: process.env.MSSQL_USER,
    password: process.env.MSSQL_PASSWORD,
    server: process.env.MSSQL_SERVER,
    database: process.env.MSSQL_DATABASE,
    port: parseInt(process.env.MSSQL_PORT, 10) || 8000,
    options:{
        encrypt: true,
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
