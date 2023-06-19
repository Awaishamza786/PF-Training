const express = require("express");

require("dotenv").config();
require("./config/mongodb_connection");

const app = express();

// const t=sessionStorage.getItem('time')
// if(t)
//   sessionStorage.setItem({'time':++t})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const path = require("path");

const admin = require("./routes/admin/admin");
const user_route = require("./routes/user/user_route");
app.use("/user", user_route);
app.use("/admin", admin);
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

const start = "16:30";
const end = new Date().toTimeString().split(" ")[0];

const port = process.env.PORT || 8080;
// const server = app.listen(port, "192.168.18.56", () => {
//   console.log(`App start on ${port}`);
// });
const server =app.listen(port, "172.16.4.41", () => {
  console.log(`App start on ${port}`);
});
// app.listen(port, () => {
//   console.log(`App start on ${port}`);
// });


//----------------------------------

const socket = require("socket.io");

const io = socket(server);

io.on("connection", (socket) => {
  console.log(`New connection: ${socket.id}`);

  const checkConnection = () => {
    socket.emit("notification", "awaishamza579@gmail.com");
  };
  setInterval(checkConnection, 5000);
  socket.on("response", (data) => {
    console.log(
      `response from ${socket.id}: ${data} ${new Date()
        .toTimeString()
        .split(" ")
        .at(0)}`
    );
  });

  socket.on("message", (data) => {
    console.log(`New message from ${socket.id}: ${data}`);
  });
});

app.use(express.static(path.resolve(__dirname, "frontend")));




//Token eyJhbGciOiJIUzI1NiJ9.YXdhaXNoYW16YTU3OUBnbWFpbC5jb20.bTU0J7syl1czWsSsJsW7Z5dwy3UT9tZbChFGESjrceE