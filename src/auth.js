var passport = require("passport");
var passportJWT = require("passport-jwt");
import { config } from "./config";
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
import {getManager} from "typeorm";
import {User} from "./entity/User";

var params = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt")
};

var strategy = new Strategy(params, async function(payload, done) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(payload.id, {});
        console.log(user)
        if (user) {
            done(null, user)
        } else {
            done(null, false);
        }
});
passport.use(strategy);

module.exports = function() {

    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function(err, user, info) {
            return passport.authenticate("jwt", config.jwtSession);
        }
    };
};