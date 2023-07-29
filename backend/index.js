const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const connectWithMongodb = require("./config/db");
const bodyParser = require("body-parser");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
// logger
app.use(morgan("tiny"));


app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 200,
    })
  );

  connectWithMongodb();

// port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});  