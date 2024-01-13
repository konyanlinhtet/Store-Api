const Product = require("../models/Product")

const getAllProductsStatic = async (req, res) => {
    
     const products =  await Product.find({})
                                   .sort('-name price')
                                   .select("name price")
                                   .limit(10)
                                   .skip(5);
     res.status(200).json({nbHit : products.length , data :  products})
}

const getAllProducts = async (req, res) => {
     const {featured , company , name , sort , fields } = req.query;
     let queryObject = {}
     if(featured) {
          queryObject.featured = featured === "true" ? true : false;
     }
     if(company) {
          queryObject.company = company
     }
     if(name) {
          queryObject.name = {$regex : name, $options : "i" }
     }
     let result =  Product.find(queryObject);
     console.log(sort)
     if(sort) {
         let sortPara = sort.replace(",", " ");

          result = result.sort(sortPara)
     }else {
          result = result.sort("createdAt")
     }
     if(fields) {
          let fieldsPara = fields.replace(",", " ");
           result = result.select(fieldsPara)
      }
      //for pagination
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const skip = (page - 1) * 10;

      
     const products = await result.skip(skip).limit(limit);
     res.status(200).json({ nbHit : products.length, data : products })
}
module.exports = {
     getAllProducts,
     getAllProductsStatic
}