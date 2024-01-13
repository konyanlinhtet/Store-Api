require('dotenv').config()//for .env
require("express-async-errors")//for try catch and errorHandlerMiddleware

const express = require("express")
const app = express()

const connectDB = require("./db/connect")

const notFoundMiddleware = require("./middleware/not-found")//read
const errorHandlerMiddleware = require("./middleware/error-handler")//read

const productsRouter = require("./routes/products")

//middleware
app.use(express.json())//for json api

//routes 
app.get("/", (req, res) => {
     return res.send("<h1>Store Api</h1><a href='/api/v1/products'>to product</a>")
})

//porducts
app.use('/api/v1/products', productsRouter)

//error middleware
app.use([notFoundMiddleware, errorHandlerMiddleware])




//server setup
const port = process.env.PORT || 3000
const start = async () => {
     try {
          await connectDB(process.env.MONGO_URI)
          app.listen(port, () => {
               console.log(`Server is listening on ${port}`)
          })
     } catch (error) {
          console.log(error)
     }
}
start()