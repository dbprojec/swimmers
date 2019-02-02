const express = require('express')
const app = express()
const swimmerRouter = require('./routes/swimmer.route')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/api/v1/', swimmerRouter)


const server = app.listen(8080, () => {
    const host = server.address().address
    const port = server.address().port
    console.log(`running on ${host}:${port}`)
})