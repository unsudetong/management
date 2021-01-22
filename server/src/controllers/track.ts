import models from '../models';
const model = models.track;

class Track {
  static getAllTrack(req, res, next) {
    const tracks = model.findAll({});
    return res.json(tracks);
  }
}

export default Track;
