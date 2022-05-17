const { userControllers } = require("../controllers/user.controller");
const { Router } = require("express");
const authMiddlewares = require("../middlewares/auth.middleware");

const router = Router();

router.get("/users", userControllers.getAllUsers);
router.get("user/:id", authMiddlewares, userControllers.getUserById);
router.post("/user/create", userControllers.createUser);
router.post("/user/login", userControllers.login);

module.exports = router;
