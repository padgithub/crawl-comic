const express = require('express')
const app = express()
var bordyParser = require('body-parser')
app.use(bordyParser.urlencoded({extended: false}))
// parse application / json
app.use(bordyParser.json())


const { getListComic } = require('../crawltoreaml')

app.get('/', (requset,respone) => {
    respone.setHeader('Content-Type', 'application/json')
    respone.send({
        status: "success",
        auther: "Phung Anh Dung",
        message: "This root path for Realm Crawl Comic"
    })
})

app.get('/listcomic', (requset,respone) => {
    getListComic(1).then(arr => {
        respone.setHeader('Content-Type', 'application/json')
        respone.send({
            status: "success",
            auther: "Phung Anh Dung",
            message: "This root path for Realm Crawl Comic",
            result: arr
        })
    }).catch((error) => {
        response.send({
            status: "failed",
            message: `Filtered users with name: ${searchedName} error: ${error}`
        })            
    })
})


module.exports = {
    app
}