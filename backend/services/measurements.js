const MongoLib = require('../lib/mongo')

class MeasurementsService {
	constructor() {
		this.mongoDB = new MongoLib()
		this.collection = 'measurements'
	}

	async getMeasurements({ params }) {
		const query = {}
		const measurements = await this.mongoDB.getAll(this.collection, query)
		return measurements || []
	}

	async getMeasurementsForGraphic({ params }) {
		const { startDate, endDate, devices } = params
		const match = {}
		if ( startDate && endDate ) {
			match['datetime'] = {
				'$gte': new Date(startDate),
				'$lte': new Date(endDate)
			}
		}
		if ( devices ) {
			match['id_device'] = {
				'$in': [...devices.split('-').map(Number)]
			}
		}
		const pipelines = [
			{
				'$match': match
			},
			{
				'$group': {
					_id: {
						device: '$id_device',
						year: { $year: '$datetime' },
						month: { $month: '$datetime' },
						day: { $dayOfMonth: '$datetime' },
						hour: { $hour: '$datetime' }
					},
					co2: { $avg: '$co2' }
				}
			},
			{
				'$sort': { "_id.device": 1, "_id.year":1, "_id.month":1, "_id.day": 1, "_id.hour": 1 }
			}
		]

		const measurements = await this.mongoDB.aggregate(this.collection, pipelines)

		return measurements.toArray() || []
	}

	async createMeasurement({ measurement }) {
		const newMeasurement = {...measurement, date: new Date()}
		const measurementId = await this.mongoDB.create(this.collection, newMeasurement)
		
		return measurementId
	}
}

module.exports = MeasurementsService