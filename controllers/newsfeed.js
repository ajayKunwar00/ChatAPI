const ErrorResponse = require("../utils/errorResponse");
const Newsfeed = require('../model/newsfeed');
const asyncHandler = require("../middleware/async")
//To get the file name extension line .jpg,.png
const path = require("path");


//--------------------CREATE Newsfeed------------------

exports.createnewsfeed = asyncHandler(async (req, res, next) => {

  const newsfeed = await Newsfeed.create(req.body);

  if (!newsfeed) {
    return next(new ErrorResponse("Error adding newsfeed"), 404);
  }

  res.status(201).json({
    success: true,
    data: newsfeed,
  });
});

//-------------------Display all newsfeed

exports.getnewsfeed = asyncHandler(async (req, res, next) => {
    const newsfeed = await Newsfeed.find({});
  
    res.status(201).json({
      success: true,
      count: newsfeed.length,
      data: newsfeed,
    });
  });

  // -----------------FIND Newsfeed BY ID-------------------

exports.getnewsfeedById = asyncHandler(async (req, res, next) => {
    const newsfeed = await Newsfeed.findById(req.params.id);
  
    if (!newsfeed) {
      return next(new ErrorResponse("user not found"), 404);
    }
  
    res.status(200).json({
      success: true,
      data: newsfeed,
    });
  });



  // ------------------UPLOAD IMAGE-----------------------

exports.NewsfeedUploadPhoto = asyncHandler(async (req, res, next) => {
    const newsfeed = await Newsfeed.findById(req.params.id);
  
    console.log(newsfeed);
    if (!newsfeed) {
      return next(new ErrorResponse(`No Newsfeed found with ${req.params.id}`), 404);
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
  
    file.name = `photo_${newsfeed.id}${path.parse(file.name).ext}`;
  
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
      if (err) {
        console.err(err);
        return next(new ErrorResponse(`Problem with file upload`, 500));
      }
  
      //insert the filename into database
      await Newsfeed.findByIdAndUpdate(req.params.id, {
        photo: file.name,
      });
    });
  
    res.status(200).json({
      success: true,
      data: file.name,
    });
  });