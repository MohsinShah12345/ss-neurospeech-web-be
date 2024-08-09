const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { createServer } = require("http");
const { Server } = require("socket.io"); //socket work
const ServiceRouter = require("./Router/index");
const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/", ServiceRouter);
const directory = path.join(__dirname, "utils");
app.use("/uploads", express.static(directory));
app.get("/", (req, res) => {
  res.send("Hello to the Post API");
});
const httpServer = createServer(app); // socket work
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
}); // socket work
global.io = io; // give access of io to global level
io.on("connection", (socket) => {
  // console.log(" Now you can listen.........", socket.id);
  require("./connections/index")(socket);
}); // socket work

const CONNECTION_URL =
  "mongodb+srv://mohsinking381:kQMncFJK13vPnlg8@socialscrew.ynnelzf.mongodb.net/?retryWrites=true&w=majority"; // connecting mongodb with server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    httpServer.listen(PORT, () =>
      console.log(`Application is running on Port: ${PORT} `)
    )
  )
  .catch((error) => console.log(error.message));
