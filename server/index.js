const app = require('express')(), 
port = process.env.PORT || 9000

require('./config')(app)

app.use('/', require('../app/routes'))

app.listen(port, () => {
	console.log('Server is listening on ' + port)
})