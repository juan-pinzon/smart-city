const express = require('express')
const DevicesService = require('../services/devices')

function DevicesApi(app) {
	const router = express.Router()
	app.use('/api/devices', router)

	const devicesService = new DevicesService()

	router.get('/', async function(req, res, next) {
		const { query } = req
		try {
			const devices = await devicesService.getDevices({ query })
			res.status(200).json({
				data: devices,
				message: 'Devices listed'
			})
		} catch (error) {
			next(error)
		}
	})
}

module.exports = DevicesApi