import models from '../models';
const model = models.user;

class User {
  static getAllUser(req, res, next) {
    const users = model.findAll({});
    return res.json(users);
  }
}

export default User;
