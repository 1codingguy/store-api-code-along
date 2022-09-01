require('dotenv').config()

const connectDB = require('./db/connect')
const Product = require('./models/product')

const jsonProducts = require('./products.json')

// simply connect to the database and popular the DB with json products, no need to listen to local server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    // remove all the products currently in the database
    await Product.deleteMany({})
    await Product.create(jsonProducts)
    console.log('success!')
    // gracefully exit the process after successfully populate the database
    process.exit(0)
  } catch (error) {
    console.log(error)
    // 1 means there's an error or some sort?
    process.exit(1)
  }
}

start()
