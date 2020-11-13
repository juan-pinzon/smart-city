require('dotenv').config()

const config = {
	dev: process.env.NODE_ENV !== 'production',
	port: process.env.PORT || 3000,
	cors: process.env.CORS,
	rdbUser: process.env.RDB_USER,
	rdbPassword: process.env.RDB_PASSWORD,
	rdbHost: process.env.RDB_HOST,
	rdbPort: process.env.RDB_PORT,
	rdbName: process.env.RDB_NAME,
	//
	nrdbUser: process.env.NRDB_USER,
	nrdbPassword: process.env.NRDB_PASSWORD,
	nrdbHost: process.env.NRDB_HOST,
	nrdbPort: process.env.NRDB_PORT,
	nrdbName: process.env.NRDB_NAME
}

module.exports = { config }