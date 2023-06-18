const ip_model = require("../model/ip_model");
const user_model = require("../model/user_model");
const session_model = require("../model/session");
const working_model = require("../model/working");
// const time_model = require("../model/time_model");
// const { showRegisteredIp } = require("./../controller/ip_controller");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const secretKey = "Awais Hamza";

async function userVerification(userModel) {
  const db_user = await user_model.findOne(
    { email: userModel.email },
    { _id: 0 }
  );
  if (db_user) {
    return (await bcrypt.compare(userModel.password, db_user.password))
      ? true
      : false;
  } else return -1;
}

async function getComparisonIpValue(str) {
  var rest = (await str.substring(0, str.lastIndexOf(".") + 1)) + "0";
  // console.log(rest);
  return rest;
}

async function compareIP(ip) {
  try {
    const ipModel = await ip_model.findOne({ ip: ip }, { _id: 0, floor: 1 });
    return ipModel;
  } catch (err) {
    console.log({ Message: "compareIP", err: err });
  }
}

async function compare_ip_from_db(ip) {
  ip = await getComparisonIpValue(ip);
  return await compareIP(await getComparisonIpValue(ip));
}

async function getSessionModel(email, date, ip, start, end, location) {
  const session = new session_model();
  session.email = email;
  session.date = date; //;
  session.ip = ip; //
  session.start = await start.split(" ").at(0);
  session.end = end; //"0";
  session.location = location;
  return session;
}
// async function getTimeModelObj(
//   email,
//   date,
//   ip,
//   ofc_start,
//   ofc_end,
//   home_start,
//   home_end,
//   ofc_time,
//   home_time
// ) {
//   const timeModel = new time_model();
//   timeModel.email = email;
//   timeModel.date = date; //;
//   timeModel.ip = ip; //
//   timeModel.ofc_start = ofc_start; //"0";
//   timeModel.ofc_end = ofc_end; //"0";
//   timeModel.home_start = home_start; //"0";
//   timeModel.home_end = home_end; //"0";
//   timeModel.ofc_time = ofc_time; //"0";
//   timeModel.home_time = home_time; //"0";
//   return timeModel;
// }
//-------------------------------

// async function storeTime(timeModel) {
//   const exists = await time_model.findOne({
//     email: timeModel.email,
//     date: timeModel.date,
//   });
//   if (exists) {
//     return false;
//   } else {
//     const ipCompare = await compare_ip_from_db(timeModel.ip);
//     const date = await new Date().toTimeString().split(" ").at(0);
//     if (ipCompare) {
//       timeModel.ofc_start = date;
//     } else {
//       timeModel.home_start = date;
//     }
//     return (await timeModel.save({})) ? true : flase;
//   }
// }
async function storeSession(_session) {
  const exists = await session_model.findOne({
    email: _session.email,
    date: _session.date,
    end: "null",
  });
  if (exists != null) {
    return false;
  } else {
    const ipCompare = await compare_ip_from_db(_session.ip);
    if (ipCompare != null) {
      _session.location = await process.env.OFFICE;
    } else {
      _session.location = await process.env.VIRTUAL;
    }
    return (await _session.save({})) ? true : false;
  }
}

async function getUserEmail(user_db_model, email) {
  return await user_db_model.find({ email: email }).email;
}

// const login = async (req, res) => {
//   try {
//     const body = req.body;
//     const userModel = new user_model();
//     {
//       userModel.password = body.password;
//       userModel.email = body.email;
//     }
//     const user_verify = await userVerification(userModel);
//     if (user_verify == true) {
//       const ip = req.ip;
//       const timeModel = await getTimeModelObj(
//         userModel.email.toString(),
//         await new Date().toDateString(),
//         await getComparisonIpValue(ip),
//         "0",
//         "0",
//         "0",
//         "0",
//         "0",
//         "0"
//       );
//       const status = await storeTime(timeModel);
//       if (status) res.status(200).send("Start");
//       else res.status(200).send("Already started");
//     } else if (user_verify == false) res.status(200).send("Password not match");
//     else res.status(500).send("Not registered User");
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ message: "Invalid to login", Error: err });
//   }
// };
//--------------------------------------

// const login = async (req, res) => {
//   try {
//     const body = req.body;
//     const userModel = new user_model();
//     {
//       userModel.password = body.password;
//       userModel.email = body.email;
//     }
//     const user_verify = await userVerification(userModel);
//     if (user_verify == true) {
//       const ip = req.ip;
//       const timeModel = await getTimeModelObj(
//         userModel.email.toString(),
//         await new Date().toDateString(),
//         await getComparisonIpValue(ip),
//         "0",
//         "0",
//         "0",
//         "0",
//         "0",
//         "0"
//       );
//       const status = await storeTime(timeModel);
//       if (status) res.status(200).send("Start");
//       else res.status(200).send("Already started");
//     } else if (user_verify == false) res.status(200).send("Password not match");
//     else res.status(500).send("Not registered User");
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ message: "Invalid to login", Error: err });
//   }
// };

const login = async (req, res) => {
  try {
    const body = req.body;
    const userModel = new user_model();
    {
      userModel.password = body.password;
      userModel.email = body.email;
    }
    const user_verify = await userVerification(userModel);
    if (user_verify == true) {
      const ip = req.ip;
      const _sessionModel = await getSessionModel(
        userModel.email.toString(),
        new Date().toDateString(),
        await getComparisonIpValue(ip),
        new Date().toTimeString(),
        "null",
        "0"
      );
      const status = await storeSession(_sessionModel);
      if (status) {
        const token = await jwt.sign(_sessionModel.email, secretKey);
        res.status(200).send({token,_sessionModel});
      } else res.status(200).send("Already started");
    } else if (user_verify == false) res.status(200).send("Password not match");
    else res.status(500).send("Not registered User");
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Invalid to login", Error: err });
  }
};

//-----------------------------------

async function storeWorkingTime(last_session) {
  const working_db_data = await working_model.findOne({
    email: last_session.email,
    date: last_session.date,
  });
  const startTime = new Date(`1970-01-01T${last_session.start}`);
  const endTime = new Date(`1970-01-01T${last_session.end}`);
  const timeDiff = endTime - startTime;
  const diffInhours = timeDiff / 3600000;
  console.log(`------diff ${diffInhours}`);
  const work = new working_model();
  work.email = last_session.email;
  work.date = last_session.date;
  if (last_session.location == process.env.OFFICE) {
    work.office_time = diffInhours.toString();
    work.virtual_time = "0";
  } else {
    work.virtual_time = diffInhours.toString();
    work.office_time = "0";
  }
  if (working_db_data == null) {
    console.log(`The time difference not exist`);

    if (work.office_time > 3) work.attendance = "Present";
    else if (work.office_time < 3) work.attendance = "ABSENT";
    else work.attendance = "ABSENT";
    console.log(work);
    await work.save({});

    console.log(`The time difference is ${diffInhours} hour.`);
  } else {
    if (last_session.location == process.env.OFFICE) {
      console.log(`db-->${working_db_data} work --->${work}`);
      work.office_time = await (
        Number(diffInhours) + Number(working_db_data.office_time)
      ).toString;

      await working_model.updateOne(
        { email: work.email, date: work.date },
        { $set: { office_time: work.office_time } }
      );
    } else {
      work.virtual_time = await (Number(diffInhours) +
        Number(working_db_data.virtual_time));
      console.log(`db-->${working_db_data} work --->${work}`);
      await working_model.updateOne(
        { email: work.email, date: work.date },
        { $set: { virtual_time: work.virtual_time } }
      );
    }
  }
}

const logout = async (req, res) => {
  try {
    const _sessionModel = await getSessionModel(
      req.body.email,
      await new Date().toDateString(),
      await getComparisonIpValue(req.ip),
      "null",
      new Date().toTimeString().split(" ").at(0),
      "null"
    );
    const _session = await session_model.findOne({
      email: _sessionModel.email,
      date: _sessionModel.date,
      end: "null",
    });
    console.log(_session);
    if (_session == null) res.status(500).send("not started");
    else {
      const sameIP = await (_session.ip.toString() ==
        _sessionModel.ip.toString());
      console.log(sameIP);
      if (!sameIP) res.status(500).send("not with same ip");
      else {
        await session_model.updateOne(
          { email: _sessionModel.email, date: _sessionModel.date, end: "null" },
          { $set: { end: _sessionModel.end } }
        );
        const last_session = await new session_model(
          await session_model.findOne(
            {
              email: _sessionModel.email,
              date: _sessionModel.date,
              end: _sessionModel.end,
            },
            { email: 1, start: 1, location: 1, date: 1, _id: 0, end: 1 }
          )
        );
        console.log("last" + last_session);
        storeWorkingTime(last_session);
        res.status(200).send("Logout");
      }
    }
  } catch (err) {
    console.log({ message: "logout", Error: err });
    res.status(500).send({ message: "logout", Error: err });
  }
};
// const logout = async (req, res) => {
//   try {
//     const timeModel = await getTimeModelObj(
//       req.body.email,
//       await new Date().toDateString(),
//       await getComparisonIpValue(req.ip),
//       // req.ip,
//       "0",
//       "0",
//       "0",
//       "0",
//       "0",
//       "0"
//     );
//     const start = await time_model.findOne({
//       email: timeModel.email,
//       date: timeModel.date,
//     });
//     console.log(start);
//     if (start == null) res.status(500).send("not started");
//     else {
//       const sameIP = await time_model.findOne({ ip: timeModel.ip });
//       console.log(sameIP);
//       if (sameIP == null) res.status(500).send("not with same ip");
//       else {
//         const ipExist = await ip_model.findOne({ ip: timeModel.ip });
//         if (ipExist == null) {
//           timeModel.home_end = await new Date().toTimeString().split(" ").at(0);
//           const a = await time_model.updateOne(
//             { email: timeModel.email, date: timeModel.date },
//             { $set: { home_end: timeModel.home_end } }
//           );
//           res.status(200).send("Home End");
//         } else {
//           timeModel.ofc_end = await new Date().toTimeString().split(" ").at(0);
//           const a = await time_model.updateOne(
//             { email: timeModel.email, date: timeModel.date },
//             { $set: { ofc_end: timeModel.ofc_end } }
//           );
//           res.status(200).send(a);
//         }
//       }
//     }
//   } catch (err) {
//     console.log({ message: "logout", Error: err });
//     res.status(500).send({ message: "logout", Error: err });
//   }
// };

//-----------------------------------

const userSave = async (req, res) => {
  try {
    const user = req.body;
    const userModel = new user_model();
    userModel.email = user.email;
    userModel.password = await bcrypt.hash(user.password, 10);
    userModel.name = user.name;
    if (await user_model.findOne({ email: userModel.email }))
      res
        .status(500)
        .send({ message: "Already exist user with " + user.email });
    else {
      await userModel.save({});
      res.status(200).send({ Message: "User save" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Invalid to save user", Error: err });
  }
};
// // db.myCollection.find({date: {$gt: new Date(2011,1,1)}});
// const saveIp = async (req, res) => {
//   try {
//     const ip = req.ip;
//     const ipModel = new ip_model();
//     ipModel.ip = ip;
//     ipModel.floor = Math.floor(Math.random() * 4);
//     if (await ip_model.findOne({ ip: ipModel.ip }))
//       res.status(500).send(`Already exist your Ip`);
//     else await ipModel.save({});
//     res.status(200).send(`Save your Ip: ${ipModel}`);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({ message: "Invalid to saveIP", Error: err });
//   }
// };

const showUsers = async (req, res) => {
  try {
    const user = await user_model.find({}, { email: 1, name: 1, _id: 0 });
    if (user) res.status(200).send(user);
    else res.status(200).send({ user: "No User find" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Invalid to show user/all", Error: err });
  }
};
module.exports = { userSave, showUsers, login, logout };
