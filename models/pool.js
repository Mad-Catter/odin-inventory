const { Pool } = require('pg');
const { loadEnvFile } = require('node:process');
if (process.env.NODE_ENV !== 'production') {
	process.loadEnvFile();
}
const connectionString = process.env.CONNECTION_STRING;
const pool = new Pool({
	connectionString: connectionString,
});

module.exports = pool;
