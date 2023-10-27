const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const connectWithMongodb = require("./config/db");
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");

const socketio = require("socket.io");
const server = require("http").Server(app);
const User = require("./models/user");
const Message = require("./models/messages");

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

const allowedDomains = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5174",
  "http://localhost:5173",
  "http://localhost:5175",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedDomains.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
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
app.use("/api/blog", require("./routes/blogRoute"));

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

const io = socketio(server, {
  pingTimeOut: 600000,
  cors: {
    origin: allowedDomains,
  },
});

global.io = io;

// app.use(( res, next) => {
//   res.io = io;
//   next();
// });

// const io = require("socket.io")(server, {
//   pingTimeOut: 600000,
//   cors: {
//     origin: " http://localhost:5174",
//   },
// });

io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected....`);

  socket.on("user_connected", async (data) => {
    // console.log("data----->", data);
    await User.findOneAndUpdate({ _id: data?.UserId }, { socketId: socket.id });
  });


  // SEND ONE ON ONE MESSAGE
  socket.on("Send-Message", async (data) => {
    console.log("send message Data", data);

    const createMessage = await Message.create({
      sender: data.sender,
      message: data.message,
      reciever: data.reciever,
      chatId: data.chatId,
    });

    // console.log(console.log("createdMessage----->", createMessage));

    io.to(socket.id).emit("recieve_message", createMessage);

    const recieverDetail = await User.findOne({ _id: data.reciever });

    if (recieverDetail?.socketId) {
      io.to(recieverDetail?.socketId).emit("recieve_message", createMessage);
    }
  });

  // FRIEND REQUEST 
  socket.on("send_Friend_Request", async (data) => {
    console.log(data, socket.id);
    await User.findOneAndUpdate(
      { _id: data.friendId },
      { $push: { friendRequestRecieved: data.userId } }
    );

    await User.findOneAndUpdate(
      { _id: data.userId },
      { $push: { friendRequestSent: data.friendId } }
    );

    io.to(socket.id).emit("after_add_friend", data.friendId);
  });

  // Join Group and send group message

  // socket.on("CreatingGroupRoom", (groupId) => {
  //   socket.join(groupId);
  // });

  // SENDING GROUP MESSAGE
  socket.on("SendGroupMessage", async (groupMessageData) => {
    socket.join(groupMessageData.groupId);

    const createGroupMessage = await Message.create(groupMessageData);

    const SenderUserDetail = await User.findOne({
      _id: groupMessageData.sender,
    });

    const socketPayload = {
      ...createGroupMessage._doc,
      sender: SenderUserDetail,
    };

    io.to(groupMessageData.groupId).emit(
      "adding_new_group_message",
      socketPayload
    );

  });

  socket.on("disconnect", async () => {
    console.log(`Socket ${socket.id} disconnected....`);
    await User.findOneAndUpdate({ socketId: socket.id }, { socketId: null });
  });
});
