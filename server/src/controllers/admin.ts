import models from '../models';
const model = models.admin;

class Admin {
  static getAllAdmin(req, res, next) {
    const admins = model.findAll({});
    return res.json(admins);
  }
}

export default Admin;
