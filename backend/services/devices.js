const MysqlLib = require('../lib/mysql')

class DevicesService {
	constructor() {
		this.mysqlDB = new MysqlLib()
	}

}

module.exports = DevicesService