const express = require("express");
const cors = require("cors");
require("./routes/database");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routes
app.use("/books", require("./routes/bookRoutes"));
app.use("/authors", require("./routes/authorRoutes"));
app.use("/connect", require("./routes/tableConnectionRoutes"));
//

app.listen(process.env.PORT, () => {
  console.clear();
  console.log(`Server listening on port ${process.env.PORT}`);
})