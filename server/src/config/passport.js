const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const config = require("./environment");
const User = require("../models/user.model");
const Admin = require("../models/admin.model");
const Executor = require("../models/executor.model");

function jwtStrategy() {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret
  };

  const strategy = new Strategy(opts, async (token, done) => {
    const user = await User.findOne({ _id: token.id });
    const admin = await Admin.findOne({ _id: token.id });
    const executor = await Executor.findById({ _id: token.id });

    if (user) {
      return done(null, user);
    } else if (executor) {
      return done(null, executor);
    } else if (admin) {
      return done(null, admin);
    } else {
      return done(null, false);
    }
  });

  passport.use(strategy);
}
function googleStrategy() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.google.client_id,
        clientSecret: config.google.secret,
        callbackURL: `/api/users/google/redirect`
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id }).then(user => {
          if (user) {
            console.log(`user is: ${user}`);
            done(null, user);
          } else {
            new User({
              name: profile.name.givenName,
              surname: profile.name.familyName,
              email: profile.emails[0].value,
              password: "123",
              username: "johny",
              emailConfirmed: "true",
              role: "user",
              googleId: profile.id
            })
              .save()
              .then(user => {
                console.log(`new user: ${user}`);
                done(null, user);
              });
          }
        });
      }
    )
  );
}
module.exports = {
  initialize: () => passport.initialize(),
  authenticate: () => passport.authenticate("jwt", { session: false }),
  authenticateGoogle: () =>
    passport.authenticate("google", {
      session: false,
      scope: ["profile", "email"],
      state: "myState"
    }),
  jwtStrategy,
  googleStrategy
};
