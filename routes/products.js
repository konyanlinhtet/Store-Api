const express = require("express")
const router = express.Router()
const {
     getAllProducts,
     getAllProductsStatic
} = require("../controllers/products")

// router.route("/").get(getAllTasks).post(createTask)
// router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask)

router.route("/").get(getAllProducts)
router.route("/static").get(getAllProductsStatic)

module.exports = router