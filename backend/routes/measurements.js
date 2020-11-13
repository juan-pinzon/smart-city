const express = require('express')
const MeasurementsService = require('../services/measurements')

function MeasurementsApi(app) {
	const router = express.Router()
	app.use('/api/measurements', router)

	//const measurementsService = new MeasurementsApi()

	router.get('/', async function(req, res, next) {
		res.status(200).json({message: 'Buenas las tenga'})
	})
}

module.exports = MeasurementsApi