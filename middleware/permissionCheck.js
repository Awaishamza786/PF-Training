const db = require("./../model/connection/connection_model");

async function permissionCheck(req, res, next) {
  try {
    console.log("--->"+req.body.u_id+req.body.p_id);
    if (isUserExist(Number(req.body.u_id))) {
      if (isPermissionExist(Number(req.body.p_id))) {
        if (checkUserPermission(Number(req.body.u_id), Number(req.body.p_id))) next();
        else res.status(500).send({ message: "user have not permission" });
      } else res.status(500).send({ message: "permission not find" });
    } else res.status(500).send({ message: "User not find" });
  } catch (err) {
    res
      .status(500)
      .send({ message: "error in check middleware permissionCheck" });
  }
}

async function isUserExist(id) {
  const tableUser = db.user;
  const user = await tableUser.findOne({ where: { u_id: id } });
  return !!user; // Returns true if user exists, false otherwise
}

async function isPermissionExist(id) {
  const tablePermission = db.permissions;
  const permission = await tablePermission.findOne({ where: { p_id: id } });
  return !!permission;
}

async function isRoleExist(id) {
  const tableRole = db.role;
  const permission = await tableRole.findOne({ where: { r_id: id } });
  return !!permission;
}

// async function getUsers(res,id) {
//   db.user
//     .find({ u_id: id })
//     .then((roles) => {
//       return roles;
//     })
//     .catch((err) => {
//       res.status(200).send({ message: "Invalid to get Roles", err });
//     });
// }
async function getUserRole(u_id) {
  if (isUserExist(u_id)) {
    const userRoles = await db.users_role.find({ u_id: u_id });
    return userRoles;
  } else return false;
}
async function getPermissionID(res, name) {
  db.permissions
    .find({ p_name: permission })
    .then((permission) => {
      return permission.p_id;
    })
    .catch((err) => {
      res
        .status(200)
        .send({ message: "Invalid to getPermissionId ----> ", err });
    });
}
async function checkUserPermission(u_id, p_id) {
  console.log("--->", u_id, p_id);
  return !!(await db.users_permission.findOne({
    where: { u_id: u_id, p_id: p_id },
  }));
}

module.exports = { permissionCheck };
