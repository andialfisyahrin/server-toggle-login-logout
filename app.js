const dotenv = require('dotenv')
const express = require('express')
const app = express()

dotenv.config({ path: './config.env'})
require('./db/conn')
const User = require('./model/userSchema')

app.use(express.json())
// we link the router files to make our route easy
app.use(require('./router/auth'))

const PORT = process.env.PORT

const middleware = (req, res, next ) => {
    console.log('Hello my Middleware')
    next()
}

app.get('/', (req, res) => {
    res.send('Hello World from the server')
})

app.get('/about', middleware, (req, res) => {
    res.send('Hello About World from the server')
})

app.get('/contact', (req, res) => {
    res.send('Hello Contact World from the server')
})

app.get('/signin', (req, res) => {
    res.send('Hello Login World from the server')
})

app.get('/signup', (req, res) => {
    res.send('Hello Register World from the server')
})

app.listen(PORT, () => {
    console.log(`server is running at port no ${PORT}`)
})
console.log('Subscribe to my channel')