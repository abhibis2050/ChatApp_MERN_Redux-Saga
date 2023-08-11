const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const connectWithMongodb = require("./config/db");
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
// logger
app.use(morgan("tiny"));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


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
const PORT = process.env.PORT || 8080;

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/message", require("./routes/messageRoutes"));
app.use("/api/group", require("./routes/groupRoutes"));
app.use("/api/chat", require("./routes/chatRoute"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
