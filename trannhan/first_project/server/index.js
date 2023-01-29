const express = require("express");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const cookieParser = require("cookie-parser");
const routes = require("./src/routes/index");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", routes);

const port = process.env.PORT || 5000;
const server = http.createServer(app);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongodb connected");
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log({ err });
    process.exit(1);
  });
