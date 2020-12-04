const express = require('express')
const cors = require('cors')
const app = express()
const { config } = require('./config/index')

const measurementsApi = require('./routes/measurements')
const devicesApi = require('./routes/devices')

const { logErrors, wrapErrors, errorHandler } = require('./utils/middleware/errorHandler')
const notFoundHandler = require('./utils/middleware/notFoundHandler')

//Body parser
app.use(express.json())
app.use(cors())

//Routes
measurementsApi(app)
devicesApi(app)

//Catch 404
app.use(notFoundHandler)

//Errors Middleware
//Los middleware de error siempre deben ir al final de las rutas
app.use(logErrors)
app.use(wrapErrors)
app.use(errorHandler)

app.listen(config.port, function() {
	console.log(`Listening http://localhost:${config.port}`)
})