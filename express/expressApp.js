const express = require('express')
const app = express()
var bordyParser = require('body-parser')
app.use(bordyParser.urlencoded({extended: false}))
// parse application / json
app.use(bordyParser.json())

const { } = require('../database/comicSchema')

app.get('/', (requset,respone) => {
    respone.setHeader('Content-Type', 'application/json')
    respone.send({
        status: "success",
        name: "Phung Anh Dung",
        message: "This root path for Realm Crawl Comic"
    })
})


module.exports = {
    app
}