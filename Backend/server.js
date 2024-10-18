const express = require("express");
const app = express();
app.require("cors");
app.use(express.urlencoded());

//app.use("/routes/")

 
pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});