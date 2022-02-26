const { User } = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class Users {
  static async register(req, res) {
    try {
      console.log(req.body);
      const { email, password } = req.body;
      const isUser = await User.findOne({
        email,
      });
      if (isUser) {
        throw {
          message: "Email already exits",
        };
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const newUser = new User({
        email,
        password: hash,
      });
      const nUser = await newUser.save();
      return res.json({
        status: "success",
        data: nUser,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        status: "failed",
        message: error.message,
      });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      console.log(email,password)
      const isUser = await User.findOne({
        email,
      });
      if (!email) {
        throw({
          message: "User not found",
        });
      }
      const isPasswordCorrect = bcrypt.compareSync(
        password,
        isUser.password
      );
      if (!isPasswordCorrect) {
        throw ({
          message: "Incorrect password",
        });
      }
      delete isUser.password;
      delete isUser.createdAt;
      delete isUser.updatedAt;
      console.log(isUser)
      const token = jwt.sign(
        {
          _id: isUser._id,
          email: isUser.email
        },
        "abc123",
        {
          expiresIn: "100d",
        }
      );
      return res.json({
        status: "success",
        user: {
          _id: isUser._id,
          email: isUser.email,
          token
        }
      });
    } catch (error) {
      console.log(error)
      return res.json({
        status: "failed",
        error: error.message,
      });
    }
  }
}

module.exports = {
  Users,
};
