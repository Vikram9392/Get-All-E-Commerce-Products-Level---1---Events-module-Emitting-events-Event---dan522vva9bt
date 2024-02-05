const fs = require("fs");
const express = require("express");
const app = express();

// Importing products from products.json file
const products = JSON.parse(fs.readFileSync(`${__dirname}/data/products.json`));
console.log(products)

// Middlewares
app.use(express.json());

// Write GET endpoint for sending all the products to client here
// Endpoint - /api/v1/products
app.post('/api/v1/products',(req,res)=>{
  const{name,price,quantity}=req.body;
  const newId=products[products.length-1].id+1;
  const newProduct={name,price,quantity,id:newId}
  products.push(newProduct);
  fs.writeFile(`${__dirname}/data/product.json`,JSON.stringify(products),err=>{
    res.status(201).json({
      status:"Success",
      message:"Product added successfully",
      data:{newProduct}
    })
  })
})
app.get("/api/v1/products",(req,res)=>{
    res.status(200).json({
        status: "success", 
      message: "Product fetched successfully",
      data: {products}
    })
})

module.exports = app;
