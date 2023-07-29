const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const token = req.header("Authorizarion");
  console.log(token, "<--- checking point of auth");
  if (!token) {
    return res
      .status(400)
      .send({ success: false, message: "token is missing" });
  }

  const user = jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN);
  if (!user) {
    return res.status(400).send({ sucess: false, message: "Invalid Authentication" });
  }
  
//   console.log(req.user);

  req.user=user;
  next();
};
