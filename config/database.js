
const mongoose = require("mongoose");

const dbConnection=()=>{
  mongoose 
  .connect('mongodb://127.0.0.1/MovieDb') 
  .then((conn) => {
    console.log(`Datase connected:${conn.connection.host}`);
  })
  .catch((err) => {
    console.error(`database error:${err}`);
    process.exit();
  });

}
module.exports=dbConnection