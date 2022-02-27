const express = require("express");

const authController = require("../controllers/auth-controller");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/allusers", authController.getAuthUsers);
router.patch("/score", authController.updateUserScore);


// router.patch("/donatepet", authController.updateUserDonatedPet);
// router.patch("/follow", authController.updateUserFollow);
// router.patch("/closeadoptrequest", authController.updateUserAdoptReqClosed);

module.exports = router;
