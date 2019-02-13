const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const passport = require("passport");

const User = require("./database/models/User");

require("env2")("./.env");

// create custom extractor to get the jwt cookie from token
const customExtractor = (req) => {
  if (req && req.cookies && req.cookies.token) {
    return req.cookies.token;
  }
  return null;
};

module.exports = () => {
  // passport strategy options
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromExtractors([customExtractor]);
  opts.secretOrKey = process.env.SECRET;

  // JWT strategy
  const strategy = new JwtStrategy(opts, (jwtPayload, done) => {
    console.log(jwtPayload);

    User.findById(jwtPayload.id, { password: 0 })
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
