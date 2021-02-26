import passportOfLocal from 'passport-local';
import User from '../models/user';
import bcrypt from 'bcrypt';

const { Strategy: LocalStrategy } = passportOfLocal;

const passportConfig = {
  usernameField: 'USER_ID',
  passwordField: 'PASSWORD',
};

const passportVerify = async (USER_ID, PASSWORD, done) => {
  try {
    const [users] = await User.findAllWhere(USER_ID);
    const user = users[0];

    if (!user) {
      done(null, false, { reason: '존재하지 않는 사용자 입니다.' });
      return;
    }

    if (await bcrypt.compare(PASSWORD, user.PASSWORD)) {
      done(null, user);
      return;
    }

    done(null, false, { reason: '올바르지 않은 비밀번호 입니다.' });
  } catch (error) {
    console.error(error);
    done(error);
  }
};

export default new LocalStrategy(passportConfig, passportVerify);
