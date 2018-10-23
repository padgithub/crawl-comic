const express = require('express')
const app = express()
var bordyParser = require('body-parser')
app.use(bordyParser.urlencoded({extended: false}))
// parse application / json
app.use(bordyParser.json())




module.exports = {
    app
}