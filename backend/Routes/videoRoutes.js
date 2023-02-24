const express = require("express");
const { uploadFiles, uploadVideo, fetchVideos, fetchVideo, uploadThumbnail, fetchLikes, fetchDisLikes, like, unlike, dislike, undislike, comment, fetchComments } = require("../Controllers/videoControllers");

const router = express.Router();



router.route('/upload/files').post(uploadFiles);
router.route('/upload/video').post(uploadVideo);
router.route('/upload/thumbnail').post(uploadThumbnail);
router.route('/fetch/videos').get(fetchVideos);
router.route('/fetch/video').post(fetchVideo);
router.route('/fetch/likes').post(fetchLikes);
router.route('/like').post(like);
router.route('/unlike').post(unlike);
router.route('/fetch/dislikes').post(fetchDisLikes);
router.route('/dislike').post(dislike);
router.route('/undislike').post(undislike);
router.route('/comment').post(comment);
router.route('/fetch/comments').post(fetchComments);



module.exports = router;