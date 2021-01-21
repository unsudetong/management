import passportOfLocal from 'passport-local';
import sequelize from '../models';

import bcrypt from 'bcrypt';

const { Strategy: LocalStrategy } = passportOfLocal;

const passportConfig = {
  usernameField: 'STUDENT_ID',
  passwordField: 'PASSWORD',
};

const passportVerify = async (STUDENT_ID, PASSWORD, done) => {
  try {
    const user = await sequelize.user.findOne({
      where: { STUDENT_ID },
    });

    // console.log('Is there user? :', !!user);
    if (!user) {
      done(null, false, { reason: '존재하지 않는 사용자 입니다.' });
      return;
    }

    // const compareResult = await bcrypt.compare(PASSWORD, user.PASSWORD);
    const compareResult = PASSWORD === user.PASSWORD;
    if (compareResult) {
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
