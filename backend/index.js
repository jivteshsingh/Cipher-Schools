const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./Routes/userRoutes");
const videoRoutes = require("./Routes/videoRoutes")
const connectDB = require("./DB");
const app = express();
//const cors = require('cors');
const path = require('path');

dotenv.config();
connectDB();

app.use(express.json());
//app.use(cors());

// Deployement
const ___dirname1 = path.resolve();
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(___dirname1,"../frontend/build")));

  app.get('*',(req,res) => {
    res.sendFile(path.resolve(___dirname1,"frontend","build","index.html"));
  })
}else{
  app.get("/", (req,res) => {
      res.send("API is running");
  });
}

//

app.use('/api/user',userRoutes);
app.use('/api/video',videoRoutes);

app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 4000

app.listen(PORT,console.log(`Server is running on port ${PORT}.`));
