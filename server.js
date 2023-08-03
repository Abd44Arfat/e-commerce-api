const express = require("express");
const dotenv = require("dotenv");
const path=require('path')
dotenv.config({ path: ".env" });
const ApiError=require("./utils/ApiError");
const morgan = require("morgan");
const globalError=require("./middlewares/errorMiddleware")
const mongoose = require("mongoose");
const dbConnection=require("./config/database")
const categoryRoute=require("./routes/categories_routes");
const subcategoryRoute=require("./routes/subCategory_route");
const brandsRoute=require("./routes/brand_routes ");
const productsRoute=require("./routes/product_routes ");
const usersRoute=require("./routes/user_route");
const authRoute=require("./routes/auth_route");


//connect with database 
dbConnection();     
 
const app = express();

// middleware


app.use(express.json()); 
app.use(express.static(path.join(__dirname,'uploads')))
 
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`node:${process.env.NODE_ENV}`);
}




//mount  Routes
app.use("/api/v1/categories",categoryRoute)
app.use("/api/v1/subcategories",subcategoryRoute)
app.use("/api/v1/brands",brandsRoute)
app.use("/api/v1/products",productsRoute)
app.use("/api/v1/users",usersRoute)
app.use("/api/v1/auth",authRoute)


  

app.all('*',(req,res,next)=>{

// const err=new Error(`Cant find this route :${req.originalUrl}`)
// next(err.message)
next(new ApiError(`Cant find this route :${req.originalUrl}`,400))


})

// Gobal error handl middleware
app.use(globalError)

const PORT = process.env.PORT || 8000;
app.listen(8000, () => {
  console.log(`app running on port ${PORT}`);
});
