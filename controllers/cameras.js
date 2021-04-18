const ErrorResponse = require("../utils/errorResponse");
const Cameras = require('../model/cameras');
const asyncHandler = require("../middleware/async")
//To get the file name extension line .jpg,.png
const path = require("path");


//--------------------CREATE Newsfeed------------------

exports.addcamera = asyncHandler(async (req, res, next) => {

  const cameras = await Cameras.create(req.body);

  if (!cameras) {
    return next(new ErrorResponse("Error adding cameras"), 404);
  }

  res.status(201).json({
    success: true,
    data: cameras,
  });
});

//-------------------Display all newsfeed

exports.getcamera = asyncHandler(async (req, res, next) => {
    const cameras = await Cameras.find({});
  
    res.status(201).json({
      success: true,
      count: cameras.length,
      data: cameras,
    });
  });

  // -----------------FIND Newsfeed BY ID-------------------

exports.getcameraById = asyncHandler(async (req, res, next) => {
    const cameras = await Cameras.findById(req.params.id);
  
    if (!cameras) {
      return next(new ErrorResponse("user not found"), 404);
    }
  
    res.status(200).json({
      success: true,
      data: cameras,
    });
  });



  // ------------------UPLOAD IMAGE-----------------------

exports.CameraUploadPhoto = asyncHandler(async (req, res, next) => {
    const cameras = await Cameras.findById(req.params.id);
  
    console.log(cameras);
    if (!cameras) {
      return next(new ErrorResponse(`No Camera found with ${req.params.id}`), 404);
    }
  
  
    if (!req.files) {
      return next(new ErrorResponse(`Please upload a file`, 400));
    }
  
    const file = req.files.file;
  
    // Make sure the image is a photo and accept any extension of an image
    // if (!file.mimetype.startsWith("image")) {
    //   return next(new ErrorResponse(`Please upload an image`, 400));
    // }
  
    // Check file size
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return next(
        new ErrorResponse(
          `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
          400
        )
      );
    }
  
    file.name = `photo_${cameras.id}${path.parse(file.name).ext}`;
  
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
      if (err) {
        console.err(err);
        return next(new ErrorResponse(`Problem with file upload`, 500));
      }
  
      //insert the filename into database
      await Cameras.findByIdAndUpdate(req.params.id, {
        photo: file.name,
      });
    });
  
    res.status(200).json({
      success: true,
      data: file.name,
    });
  });