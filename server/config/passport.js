import pkg from 'passport-jwt';
import userSchema  from '../models/addUser.js';
import * as dotenv from 'dotenv';

dotenv.config();
const JwtStrategy = pkg.Strategy;
const ExtractJwt = pkg.ExtractJwt;

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.Secret;
export default (passport) => {
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    userSchema.findById(jwt_payload.id).then((user) => {
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    });
  }));
};