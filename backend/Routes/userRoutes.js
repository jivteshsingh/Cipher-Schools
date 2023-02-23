const express = require("express");
const { registeruser, authoriseduser } = require("../Controllers/userControllers");

const router = express.Router();

router.route('/').post(registeruser);
router.post('/login',authoriseduser);

module.exports = router;