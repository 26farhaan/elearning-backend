const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes");
const morgan = require("morgan")
const cors = require("cors")

require("dotenv").config();

app.use(cors())
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json())
app.use("/api/v1", routes)

const port = process.env.PORT_APP || 5000;
app.listen(port , () => {
    console.log(`Server running on port ${port}`)
})