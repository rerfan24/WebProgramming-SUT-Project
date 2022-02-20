const express = require('express');
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

const usersRouter = require("./routes/Users");
app.use("/users", usersRouter);
const globalRouter = require("./routes/GCounters");
app.use("/global", globalRouter);
const ownRouter = require("./routes/OCounters");
app.use("/own", ownRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
      console.log("Server running on port 3001");
    });
});