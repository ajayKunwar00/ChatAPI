const express = require("express");
const router = express.Router();

const { register, login, getMe, logout, UserPhotoUpload, updateUser } = require("../controllers/auth");

const { protect } = require("../middleware/auth");
router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.put("/user/:id/photo" ,UserPhotoUpload)
router.get("/logout", logout)
router.put("/update/user/:id", updateUser)

module.exports = router;