let express = require('express')
let bodyParser = require('body-parser')
let api_routes = require('./routes/api.js')

//App Config
let app = express()

app.use(bodyParser.json())

app.use('/api', api_routes)

//Error handler for server errors
app.use(function(req, res, next) {
    console.error.apply(err.stack)
    res.status(500).send('Sever Error')
})

//Start server running
let server = app.listen(process.env.PORT || 3000, function() {
    console.log('Express server running on port', server.address().port)
})