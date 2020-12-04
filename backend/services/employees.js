const MongoLib = require('../lib/mongo')

class EmployeesService {
	constructor() {
		this.mongoDB = new MongoLib()
		this.collection = 'employees'
	}
}

module.exports = EmployeesService