import models from '../models';
const model = models.userTrack;

class UserTrack {
  static getAllUserTrack(req, res, next) {
    const userTracks = model.findAll({});
    return res.json(userTracks);
  }
}

export default UserTrack;
