const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.userControllers = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.json(error);
    }
  },
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      res.json(user);
    } catch (e) {
      res.json(e);
    }
  },
  createUser: async (req, res) => {
    try {
      const { email, password, role } = req.body;
      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );
      const user = await User.create({
        email: email,
        password: hash,
        role: role,
      });
      res.json(user);
    } catch (e) {
      res.json(e);
    }
  },
  login : async (req, res) => {
    try {
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (!candidate) {
        return res.status(401).json("Неверный логин или пароль!");
      }
      const valid = await bcrypt.compare(password, candidate.password);
      if (!valid) {
        return res.status(401).json("Неверный логин или пароль!");
      }
      const payload = {
        id: candidate._id,
      };
      const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
        expiresIn: "20d",
      });
      res.json({
        token: token,
        id: candidate._id,
      });
    } catch (e) {
      res.json(e.status(401).json(e.toString()));
    }
  },
};
