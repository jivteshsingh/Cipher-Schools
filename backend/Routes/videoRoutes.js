const express = require("express");
const { uploadFiles, uploadVideo, fetchVideos, fetchVideo, uploadThumbnail } = require("../Controllers/videoControllers");
const { protect } = require("../Middlewares/authMiddleware");

const router = express.Router();



router.route('/upload/files').post(uploadFiles);
router.route('/upload/video').post(uploadVideo);
router.route('/upload/thumbnail').post(uploadThumbnail);
router.route('/fetch/videos').get(protect,fetchVideos);
router.route('/fetch/video').post(protect,fetchVideo);


module.exports = router;