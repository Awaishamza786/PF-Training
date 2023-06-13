module.exports = () => {
  class User_Data {
    constructor(fname, lname, email, password) {
      this.f_name = fname;
      this.l_name = lname;
      this.email = email;
      this.password = password;
    }
  }
  return User_Data;
};
