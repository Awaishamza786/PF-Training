const db = require("./../model/connection/connection_model");

const tableUser = db.user;
const tableUserPermission = db.users_permission;

// class User_Data {
//   constructor(fname, lname, email, password) {
//     this.f_name = fname;
//     this.l_name = lname;
//     this.email = email;
//     this.password = password;
//   }
// }

const get_user_permission = async (req, res) => {
  try {
    let users_permissions = await tableUserPermission.findAll({
      include: [
        {
          model: tableUser,
        },
      ],
    });
    res.status(200).send(users_permissions);
  } catch (err) {
    res.status(200).send({ message: "No found Record" });
    console.log("controller/userController getUser => " + err);
  }
};

const add_user_Permission = async (req, res) => {
  try {
    await tableUserPermission.create({
      u_id: req.body.u_id,
      p_id: req.body.p_id,
    });
    res.status(200).send({ message:"add" });
  } catch (err) {
    res.status(200).send({ message: "No found Record" });
    console.log("controller/userController addUser => " + err);
  }
};

module.exports = {
  get_user_permission,
  add_user_Permission,
};
