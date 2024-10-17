import config from "../config/index.js";
import { jwtHelpers } from "../helpers/jwtHelpers.js";

const auth =
  (...requiredRoles) =>
  async (req, res, next) => {
    try {
      //get authorization token
      const token = req.headers.authorization;

      if (!token) {
        throw new Error("You are not authorized");
      }
      // verify token
      let verifiedUser = null;

      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret);

      req.user = verifiedUser;

      // await User.findByIdAndUpdate(userId, { lastLogin: Date.now() }, { new: true });

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new Error("Forbidden");
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
