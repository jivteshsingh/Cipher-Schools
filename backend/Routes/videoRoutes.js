const express = require("express");
const { uploadFiles, uploadVideo, fetchVideos, fetchVideo } = require("../Controllers/videoControllers");
const { protect } = require("../Middlewares/authMiddleware");

const router = express.Router();



router.route('/upload/files').post(protect,uploadFiles);
router.route('/upload/video').post(protect,uploadVideo);
router.route('/fetch/videos').get(protect,fetchVideos);
router.route('/fetch/video').post(protect,fetchVideo);


module.exports = router;