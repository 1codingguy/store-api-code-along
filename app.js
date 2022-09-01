require('dotenv').config()
require('express-async-errors')
// async error

const express = require('express')
const app = express()

const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

// import custom middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('<h1>Store API</h1> <a href="/api/v1/products">products route</a>')
})

app.use('/api/v1/products', productsRouter)

// plug in the custom middleware
app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => console.log(`Listening on port ${port} ...`))
  } catch (error) {
    console.log(error)
  }
}

start()
