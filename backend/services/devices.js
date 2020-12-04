const MongoLib = require('../lib/mongo')

class DevicesService {
	constructor() {
		this.mongoDB = new MongoLib()
		this.collection = 'devices'
	}

	async getDevices({ query }) {
		const devices = await this.mongoDB.getAll(this.collection, query)
		return devices || []
	}
}

module.exports = DevicesService