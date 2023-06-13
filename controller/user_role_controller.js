const db = require("./../model/connection/connection_model");

const tableUser = db.user;
const tableRole = db.role;
const tableUserRole = db.users_role;

// class User_Data {
//   constructor(fname, lname, email, password) {
//     this.f_name = fname;
//     this.l_name = lname;
//     this.email = email;
//     this.password = password;
//   }
// }

const get_user_role = async (req, res) => {
  try {
    let users_roles = await tableUserRole.findAll({
      include: [
        {
          model: tableUser,
        },
        {
          model: tableRole,
        },
      ],
    });
    res.status(200).send(users_roles);
  } catch (err) {
    res.status(200).send({ message: "No found Record" });
    console.log("controller/userController getUser => " + err);
  }
};

const add_user_role = async (req, res) => {
  try {
    if (!!(await tableUser.findOne({ where: { u_id: req.body.u_id } }))) {
      if (!!(await tableRole.findOne({ where: { r_id: req.body.r_id } }))) {
        await tableUserRole.create({
          u_id: req.body.u_id,
          r_id: req.body.r_id,
        });
        res.status(200).send({ message: "add" });
      } else res.status(200).send({ message: "No role Found in record" });
    } else {
      res.status(200).send({ message: "No permission found in Record" });
    }
  } catch (err) {
    res.status(200).send({ message: "No found Record" });
    console.log("controller/userController addUser => " + err);
  }
};

module.exports = {
  get_user_role,
  add_user_role,
};
