const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const passport = require("passport");

const User = require("./database/models/User");

module.exports = () => {
  // passport strategy options
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.SECRET;

  // JWT strategy
  const strategy = new JwtStrategy(opts, (jwtPayload, done) => {
    console.log("JWT", jwtPayload);
    User.findById(jwtPayload)
      .then((user) => {
        if (user) return done(null, user);
        return done(null, false);
      })
      .catch((err) => {
        done(err, false);
      });
  });

  // use JWT strategy as middleware
  passport.use(strategy);

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate("jwt", { session: false }),
  };
};
