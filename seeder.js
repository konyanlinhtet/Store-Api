require('dotenv').config()//for .env
const connectDB = require("./db/connect")
const Product = require("./models/Product")
const jsonProducts = require("./products.json")
console.log(jsonProducts)

const start = async () => {
     try {
          await connectDB(process.env.MONGO_URI)
          await Product.deleteMany()
          await Product.create(jsonProducts)
          console.log('Success!!!!')
     } catch (error) {
          console.log(error)
     }
}
start()