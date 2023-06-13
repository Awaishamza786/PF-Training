const express = require("express");
const cors = require("cors");
// const bodyParser = require('body-parser');

require("dotenv").config();

const app = express();
app.use(express.json());

var corOptions = {
  origin: "http://localhost:8081",
};


const userRouter = require("./routes/user");
const permissionRouter = require("./routes/permission");
const rolesRouter = require("./routes/roles");
const userPermissionRouter = require("./routes/user_permission");
const userRolesRouter = require("./routes/user_roles");

app.use("/user", userRouter);
app.use("/permissions", permissionRouter);
app.use("/roles", rolesRouter);
app.use("/userpermission", userPermissionRouter);
app.use("/userroles", userRolesRouter);

app.use(cors(corOptions));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App start on ${port}`);
});
