const {
  signUpController,
  loginController,
  refreshAccessTokenController,
  logoutController,
} = require("../controllers/authController");
const router = require("express").Router();

router.post("/signup", signUpController);

router.post("/login", loginController);

router.get("/refresh", refreshAccessTokenController);

router.post('/logout', logoutController)

module.exports = router;
