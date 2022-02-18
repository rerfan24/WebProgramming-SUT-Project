const express = require('express');
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

// var storage = multer.diskStorage({

//   destination: "./pictures/profile",
//   filename: function (req, file, cb) {
//   cb(null, Date.now() + '-' +file.originalname )
//   }
// })

// var upload = multer({ storage: storage }).array('file');

// app.post('/upload',function(req, res) {
 
//   upload(req, res, function (err) {
//          if (err instanceof multer.MulterError) {
//              return res.status(500).json(err)
//          } else if (err) {
//              return res.status(500).json(err)
//          }
//     return res.status(200).send(req.file)
  
//   })
// });

const db = require("./models");

const usersRouter = require("./routes/Users");
app.use("/users", usersRouter);
const globalRouter = require("./routes/GCounters");
app.use("/global", globalRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
      console.log("Server running on port 3001");
    });
});