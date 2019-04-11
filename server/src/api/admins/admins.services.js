const jwt = require("jsonwebtoken");
const config = require("../../config/environment");
const Admin = require("../../models/admin.model");


async function authenticate({ name,password }) {
    const admin = await Admin.findOne({ name })

    if (admin === null) throw "Admin not found";

    let success = await admin.comparePassword(password);

    if (success === false) throw new Error ( "Password is incorrect" );

    const token = jwt.sign (
      { 
        id: admin._id,
        role: admin.role
      },
      config.jwt.secret,
      { expiresIn: config.jwt.expiration }
    );

    return {
      token: token,
      admin: {
        _id: admin._id,
        role: admin.role
      }
    };
}
async function loadAdmin( admin ) {
  return {
    _id: admin._id,
    role: admin.role
    // emailConfirmed:admin.emailConfirmed
  }
}
async function register(data) {
  console.log(data);
    const { name, password,role="admin"} = data;
    const admin = new Admin({ name, password, role });
    await admin.save();
    const savedAdmin =await Admin.findOne({name});
    const res = {
      _id: savedAdmin._id,
      role: savedAdmin.role
    }
    console.log(res);
    return res;
}
module.exports = {
  authenticate,
  register,
  loadAdmin
};
