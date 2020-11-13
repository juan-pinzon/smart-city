const MongoLib = require('../lib/mongo')

class MeasurementsService {
	constructor() {
		this.mongoDB = new MongoLib()
		this.collection = 'measurements'
	}

	async createMeasurement({ measurement }) {
		const newMeasurement = {...measurement, date: new Date()}
		const measurementId = await this.mongoDB.create(this.collection, newMeasurement)
		
		return measurementId
	}
}

module.exports = MeasurementsService