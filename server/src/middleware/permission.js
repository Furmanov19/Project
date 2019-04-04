const httpStatus = require("http-status");
const { authenticate } = require("../config/passport");

function permit(roles = []) {
  // roles param can be a single role string (e.g. Role.User or 'User')
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === "string") {
    roles = [roles];
  }

  return [
    // authenticate JWT token and attach user to request object (req.user)
    authenticate(),
    // // authorize based on user role
    (req, res, next) => {
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(httpStatus.FORBIDDEN).send("Forbidden");
      }
      // authentication and authorization successful
      next();
    }
  ];
}

module.exports = permit;
