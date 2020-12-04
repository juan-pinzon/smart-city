const express = require('express')
const MeasurementsService = require('../services/measurements')

function MeasurementsApi(app) {
	const router = express.Router()
	app.use('/api/measurements', router)

	const measurementsService = new MeasurementsService()

	router.get('/', async function(req, res, next) {
		const { query: params } = req
		try {
			const measurements = await measurementsService.getMeasurements({ params })
			res.status(200).json({
				data: measurements,
				message: 'Measurements listed'
			})
		} catch (error) {
			next(error)
		}
	})

	router.get('/graphic', async function (req, res, next) {
		const { query: params } = req
		try {
			const measurements = await measurementsService.getMeasurementsForGraphic({ params })
			const data = measurements.map(ele => {
			const { _id } = ele
				ele = { ...ele, ..._id }
				delete ele._id
				return ele
			})

			res.status(200).json({
				data: data,
				message: 'Measurements graphic'
			})
		} catch (error) {
			next(error)
		}
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