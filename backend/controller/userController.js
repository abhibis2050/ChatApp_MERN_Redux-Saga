const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const cloudinary = require("cloudinary");

//creating Refresh Token
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_REFRESH_TOKEN, {
    expiresIn: "10d",
  });
};
//Creating Access Token
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_ACCESS_TOKEN, {
    expiresIn: "10d",
  });
};

exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    let profilePictureFile;

    console.log(req.body);
    // console.log(req.files.avatar);

    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .send({ status: false, message: "Please Enter all the Feilds" });
    }

    if (!firstName) {
      return res.status(400).send({
        success: false,
        message: "Please Enter Your First Name",
      });
    }
    if (!lastName) {
      return res.status(400).send({
        success: false,
        message: "Please Enter Your Last Name",
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Please Enter Your Email",
      });
    }
    if (!password) {
      return res.status(400).send({
        success: false,
        message: "Please Enter Your Password",
      });
    }

    if (req.files) {
      if (req.files.avatar) {
        profilePictureFile = await cloudinary.v2.uploader.upload(
          req.files.avatar.tempFilePath,
          { folder: "Chat_Profile_Pictures" }
        );
      }
      console.log(profilePictureFile);
    }

    const profileAvatar = profilePictureFile && {
      id: profilePictureFile.public_id,
      secure_url: profilePictureFile.secure_url,
    };

    console.log("profileAvatar", profileAvatar);
    req.body.avatar = profileAvatar ? profileAvatar : "";

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .send({ status: false, message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    req.body.password = hashPassword;
    const user = await User.create(req.body);

    if (user) {
      return res.status(201).send({
        success: true,
        message: "User Created Successfully",
        // data: user,
      });
    } else {
      return res.status(400).send({ message: "user not found" });
    }
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let refresh_Token;
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Please Enter Your Email",
      });
    }
    if (!password) {
      return res.status(400).send({
        success: false,
        message: "Please Enter Your Password",
      });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "User Not Found" });
    }

    //to check if the password matches or not
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "password didnot match,Try Again!!",
      });
    } else {
      refresh_Token = createRefreshToken({ id: user._id });
      console.log(refresh_Token);

      await User.findOneAndUpdate(
        { email },
        {
          refresh_token: refresh_Token,
          refresh_token_expiry: Date.now() + 30 * 24 * 60 * 60 * 1000,
          isLoggedIn: true,
        }
      );
    }

    return res.send({
      success: true,
      refresh_token: refresh_Token,
      message: "Login Successful",
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

exports.getAccessToken = async (req, res) => {
  try {
    let rf_token;
    console.log(req.query.email);

    if (req.query.email) {
      rf_token = await User.findOne({
        email: req.query.email,
        refresh_token_expiry: { $gt: Date.now() },
      });
    }

    // console.log(rf_token, "<------------rf_token");

    if (!rf_token) {
      return res.send({ success: false, message: "Please login again" });
    }

    const logInUser = jwt.verify(
      rf_token.refresh_token,
      process.env.JWT_SECRET_REFRESH_TOKEN
    );

    // console.log("logInUser------------------>", logInUser);

    if (!logInUser) {
      return res
        .status(400)
        .send({ success: false, message: "Please login again" });
    }

    const access_Token = createAccessToken({ _id: logInUser.id });
    // console.log("access_Token------------------>", access_Token);

    return res.status(200).send({ success: true, accessToken: access_Token });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

exports.authUser = async (req, res) => {
  try {
    const getUser = await User.findOne({ _id: req.user._id })
      .populate({
        path: "contacts",
      })
      .select("-refresh_token")
      .select("-refresh_token_expiry");
    return res.status(200).send({ success: true, authUser: getUser });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

exports.getSingleUserDetailsWithId = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log(req.query);
    const getUser = await User.findOne({ _id: userId })
      .select("-refresh_token")
      .select("-refresh_token_expiry");
    return res.status(200).send({ success: true, data: getUser });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const allUser = await User.find();
    return res.status(200).send({ success: true, data: allUser });
  } catch (error) {}
  return res.status(500).send({ success: false, message: error.message });
};

exports.sendFriendRequest = async (req, res) => {
  try {
    const { userId, friendId } = req.query;

    await User.findOneAndUpdate(
      { _id: friendId },
      { $push: { friendRequestRecieved: userId } }
    );

    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { friendRequestSent: friendId } }
    );

    return res
      .status(200)
      .send({ success: true, message: "Friend Request Sent" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

exports.acceptFriendRequest = async (req, res) => {
  try {
    const { userId, friendRequestId } = req.query;

    const findUser = await User.findOne({ _id: userId });

    if (findUser.friendRequestRecieved.includes(friendRequestId) === true) {
      findUser.friendRequestRecieved = findUser.friendRequestRecieved.filter(
        (singlefriendRequestId) =>
          singlefriendRequestId.toString() !== friendRequestId
      );
      findUser.contacts.push(friendRequestId);
    }
    await findUser.save();
    // console.log("findUser",findUser)

    // update the friend user contact
    const friendUserDetail = await User.findOne({ _id: friendRequestId });

    if (friendUserDetail?.friendRequestSent?.includes(userId) === true) {
      friendUserDetail.friendRequestSent =
        friendUserDetail.friendRequestSent.filter(
          (reqSendId) => reqSendId.toString() !== userId
        );
      friendUserDetail.contacts.push(userId);
    }

    await friendUserDetail.save();

    // console.log("friendUserDetail",friendUserDetail)

    // console.log("SOCKET ID________________",findUser.socketId)
    global.io
      .to(findUser.socketId)
      .emit("accept_friend_request", { friendRequestId });

    return res
      .status(200)
      .send({ success: true, message: "Added To Friend List" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

exports.getAllFriendList = async (req, res) => {
  try {
    const { userId } = req.query;
    const friendList = await User.findOne({ _id: userId })
      .select("contacts")
      .populate("contacts");

    return res.status(200).send({ success: true, data: friendList });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

exports.getAllRecivedFriendRequest = async (req, res) => {
  try {
    const { userId } = req.query;
    const friendRequestRecieved = await User.findOne({ _id: userId })
      .select("friendRequestRecieved")
      .populate({
        path: "friendRequestRecieved",
      });
    return res.status(200).send({ success: true, data: friendRequestRecieved });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

exports.getAllSendFriendRequest = async (req, res) => {
  try {
    const { userId } = req.query;
    const friendRequestSent = await User.findOne({ _id: userId })
      .select("friendRequestSent")
      .populate("friendRequestSent");
    return res.status(200).send({ success: true, data: friendRequestSent });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

exports.getAllFriendId = async (req, res) => {
  try {
    const { userId } = req.query;
    const friendList = await User.findOne({ _id: userId }).select("contacts");

    return res.status(200).send({ success: true, data: friendList });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

exports.getAllRecivedFriendRequestId = async (req, res) => {
  try {
    const { userId } = req.query;
    const friendRequestRecieved = await User.findOne({ _id: userId }).select(
      "friendRequestRecieved"
    );

    return res.status(200).send({ success: true, data: friendRequestRecieved });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

exports.getAllSendFriendRequestId = async (req, res) => {
  try {
    const { userId } = req.query;
    const friendRequestSent = await User.findOne({ _id: userId }).select(
      "friendRequestSent"
    );

    return res.status(200).send({ success: true, data: friendRequestSent });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

// cancel Sent friend request

exports.CancelSendFriendRequest = async (req, res) => {
  try {
    const { userId, friendId } = req.query;

    const userDetail = await User.findOne({ _id: userId }).select(
      "friendRequestSent"
    );

    userDetail.friendRequestSent = userDetail.friendRequestSent.filter(
      (singleContact) => singleContact.toString() !== friendId
    );

    // console.log("userDetail", userDetail);
    userDetail.save();

    const friendUserDetail = await User.findOne({ _id: friendId }).select(
      "friendRequestRecieved"
    );

    friendUserDetail.friendRequestRecieved =
      friendUserDetail.friendRequestRecieved.filter(
        (singleContact) => singleContact.toString() !== userId
      );

    // console.log("userDetail 2", friendUserDetail);
    friendUserDetail.save();

    return res.status(200).send({
      success: true,
      message: "Sent Friend Request Cancelled Successfully",
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

// cancel Recieved friend request
exports.CancelRecivedFriendRequest = async (req, res) => {
  try {
    const { userId, friendId } = req.query;

    const userDetail = await User.findOne({ _id: userId }).select(
      "friendRequestRecieved"
    );

    userDetail.friendRequestRecieved = userDetail.friendRequestRecieved.filter(
      (singleContact) => singleContact.toString() !== friendId
    );

    console.log("userDetail", userDetail);
    userDetail.save();

    const friendUserDetail = await User.findOne({ _id: friendId }).select(
      "friendRequestSent"
    );

    friendUserDetail.friendRequestSent =
      friendUserDetail.friendRequestSent.filter(
        (singleContact) => singleContact.toString() !== userId
      );

    console.log("userDetail 2", friendUserDetail);
    friendUserDetail.save();

    return res
      .status(200)
      .send({ success: true, message: "Cancelled Successfully" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

// unfriend
exports.Unfriend = async (req, res) => {
  try {
    const { userId, unfriendId } = req.query;
    const userDetail = await User.findOne({ _id: userId }).select("contacts");

    userDetail.contacts = userDetail.contacts.filter(
      (singleContact) => singleContact.toString() !== unfriendId
    );

    // console.log("userDetail 2", userDetail);
    userDetail.save();

    const unfriendUserDetail = await User.findOne({ _id: unfriendId }).select(
      "contacts"
    );

    unfriendUserDetail.contacts = unfriendUserDetail.contacts.filter(
      (singleContact) => singleContact.toString() !== userId
    );

    // console.log("userDetail 2", unfriendUserDetail);
    unfriendUserDetail.save();

    return res
      .status(200)
      .send({ success: true, message: "User Unfriened Successfully" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

//logot
exports.logOut = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res
        .status(400)
        .send({ success: false, message: "User Not Found" });
    } else {
      {
        await UserModel.findOneAndUpdate(
          {
            email: email,
          },
          {
            refresh_token: undefined,
            refresh_token_expiry: undefined,
          }
        );
      }
    }
    return res
      .status(200)
      .send({ success: true, message: "logged out successfully" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

exports.updateProfilePicture = async (req, res) => {
  try {
    const { userId } = req.query;
    let updateProfilePicture;
    // console.log(req.query, "<----- req.query");
    if (req.files) {
      if (req.files.updateAvatar) {
        console.log(req.files.updateAvatar.tempFilePath, "<----- file");
        updateProfilePicture = await cloudinary.v2.uploader.upload(
          req.files.updateAvatar.tempFilePath,
          { folder: "Chat_Profile_Pictures" }
        );
      }
    }
    const profileAvatar = updateProfilePicture && {
      id: updateProfilePicture.public_id,
      secure_url: updateProfilePicture.secure_url,
    };

    const updateUserImage = await User.findOneAndUpdate(
      { _id: userId },
      { avatar: profileAvatar }
    );

    return res
      .status(200)
      .send({ status: true, message: "Profile picture Update Successfully" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

// Get All Users based on search

exports.allUsersBasedOnSearch = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    // console.log(req.user);
    console.log(keyword);
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

    return res
      .status(200)
      .send({
        success: true,
        message: "users found successfully",
        data: users,
      });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};