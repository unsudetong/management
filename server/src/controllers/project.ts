import models from '../models';
const model = models.project;

class Project {
  static getAllProject(req, res, next) {
    const projects = model.findAll({});
    return res.json(projects);
  }
}

export default Project;
