const express = require('express')
const MeasurementsService = require('../services/measurements')

function MeasurementsApi(app) {
	const router = express.Router()
	app.use('/api/measurements', router)

	const measurementsService = new MeasurementsService()

	router.get('/', async function(req, res, next) {
		res.status(200).json({message: 'Buenas las tenga'})
	})

	router.post('/', async function(req, res, next) {
		const { body: measurement } = req
		try {
			const measurementId = await measurementsService.createMeasurement({ measurement })
			res.status(201).json({
				data: measurementId,
				message: 'Medición creada'
			})
		} catch (error) {
			next(error)
		}
	})
}

module.exports = MeasurementsApi