const asyncHandler = require("express-async-handler");
const multer = require('multer');
const { Video } = require("../Models/videoModel");
var ffmpeg = require('fluent-ffmpeg');


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('Only MP4 is supported'), false);
        }
        cb(null, true)
    }
});

var upload = multer({ storage: storage }).single("file");




const uploadFiles = asyncHandler((req,res) => {
    upload(req, res, err => {
        if (err) {
            console.log(err);
            return res.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })
});

const uploadVideo = asyncHandler((req,res) => {
    console.log(req.body);
    const video = new Video(req.body);

    video.save((err, video) => {
        if (err) {
            return res.status(400).json({success: false, err})
        }
        return res.status(200).json({success: true});
    })
});

const fetchVideos = asyncHandler((req,res) => {
    Video.find().populate('writer').exec((err, videos) => {
        if (err) {
            return res.status(400).send(err);
        }
        return res.status(200).json({success: true, videos});
    })
});

const fetchVideo = asyncHandler((req,res) => {
    Video.findOne({ "_id" : req.body.videoId }).populate('writer').exec((err, video) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, video })
    })
});

const uploadThumbnail = asyncHandler((req, res) => {

    let thumbsFilePath = "";
    let fileDuration = "";

    ffmpeg.setFfprobePath("c:\\PATH_Programs\\ffprobe.exe");
    ffmpeg.setFfmpegPath("c:\\PATH_Programs\\ffmpeg.exe");

    ffmpeg.ffprobe(req.body.filePath, function(err, metadata) {

        console.log(req.body.filePath);


        console.dir(metadata);
        console.log(metadata.format.duration);

        fileDuration = metadata.format.duration;
    });

    ffmpeg(req.body.filePath)
        .on("filenames", function(filenames) {
            console.log("Will generate " + filenames.join(", "))
            thumbsFilePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function () {
            console.log("Screenshots taken")
            return res.json({success: true, thumbsFilePath: thumbsFilePath, fileDuration: fileDuration})
        })
        .screenshots({
            count: 1,
            folder: 'uploads/thumbnails',
            size:"320x240",
            filename: "thumbnail-%b.png"
        });
});


module.exports = { uploadFiles, uploadVideo, fetchVideos, fetchVideo, uploadThumbnail }

