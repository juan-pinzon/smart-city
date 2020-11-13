const mysql = require('mysql2/promise')
const { config } = require('../config')

const HOST = encodeURIComponent(config.rdbHost)
const USER = encodeURIComponent(config.rdbUser)
const PASSWORD = encodeURIComponent(config.rdbPassword)
const DB_NAME = encodeURIComponent(config.rdbName)


class MysqlLib {

	constructor() {
		this.client = mysql.createConnection({
			host: HOST,
			user: USER,
			password: PASSWORD,
			database: DB_NAME
		})
	}

	connect() {
		if (!MysqlLib.connection) {
			MysqlLib.connection = new Promise((resolve, reject) => {
				this.client
					.then(response => resolve(response))
					.catch(err => reject(err))
			})
		}
		return MysqlLib.connection
	}

	execute(query, params = null) {
		return this.connect().then(db => {
			const sql = mysql.format(query, params)
			//console.log(sql)
			return db.query(sql)
		})
	}
}

module.exports = MysqlLib
