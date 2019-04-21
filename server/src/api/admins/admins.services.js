const jwt = require("jsonwebtoken");
const config = require("../../config/environment");
const Admin = require("../../models/admin.model");

async function authenticate({ name, password }) {
  const admin = await Admin.findOne({ name });

  if (admin === null) throw new Error("Admin not found");

  let success = await admin.comparePassword(password);

  if (!success) throw new Error("Password is incorrect");

  const token = jwt.sign(
    {
      id: admin._id,
      role: admin.role
    },
    config.jwt.secret,
    { expiresIn: config.jwt.expiration }
  );

  const data = admin.toObject();
  const { password: adminPassword, ...adminWithoutPassword } = data;

  return {
    token: token,
    admin: adminWithoutPassword
  };
}
async function loadAdmin(admin) {
  const data = admin.toObject();
  const { password: adminPassword, ...adminWithoutPassword } = data;

  return {
    admin: adminWithoutPassword
  };
}
async function register(data) {
  const { name, password, role = "admin" } = data;
  const admin = new Admin({ name, password, role });
  await admin.save();
  const savedAdmin = await Admin.findOne({ name }).toObject();
  const { password: adminPassword, ...adminWithoutPassword } = savedAdmin;
  const res = {
    admin:adminWithoutPassword
  };
  return res;
}
module.exports = {
  authenticate,
  register,
  loadAdmin
};
