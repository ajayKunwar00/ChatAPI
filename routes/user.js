const express = require("express");
const  router = express.Router();

const {
  createStudent,
  getStudents, 
  getStudentById,
  deleteStudent,
  StudentPhotoUpload,
  getuser,
  createUser,
  getuserById,
  deleteUser,
  } = require("../controllers/user");

  const { protect } = require("../middleware/auth");

  router
  .route("/")
  .get(protect,getuser)
  .post(protect,createUser);

//   router
//   .route("/:id/photo")
//   .put(protect, StudentPhotoUpload);

  router
  .route("/:id")
  .get(protect,getuserById)
  .delete(protect, deleteUser);


  module.exports = router