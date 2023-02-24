const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./Routes/userRoutes");
const videoRoutes = require("./Routes/videoRoutes")
const connectDB = require("./DB");
const app = express();
const cors = require('cors');

dotenv.config();
connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/user',userRoutes);
app.use('/api/video',videoRoutes);

app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 4000

const server = app.listen(PORT,console.log(`Server is running on port ${PORT}.`));
