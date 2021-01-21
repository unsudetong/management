import passportOfJwt from 'passport-jwt';
import sequelize from '../models';
import dotenv from 'dotenv';
dotenv.config();

const { ExtractJwt, Strategy: JWTStrategy } = passportOfJwt;

const cookieExtractor = req => {
  let token;
  if (req && req.headers.authorization) token = req.headers.authorization;
  return token;
};

const JWTConfig = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.PRIVATE_TOKEN_KEY,
};

const JWTVerify = async (jwtPayload, done) => {
  try {
    const user = await sequelize.user.findOne({
      where: { STUDENT_ID: jwtPayload.STUDENT_ID },
    });

    if (user) return done(null, user);
    return done(null, false, { reason: '올바르지 않은 인증정보입니다.' });
  } catch (error) {
    console.error(error);
    done(error);
  }
};

export default new JWTStrategy(JWTConfig, JWTVerify);
