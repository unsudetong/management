import models from '../models';
const model = models.project;

class Project {
  static async getAllProject(req, res, next) {
    const projects = await model.findAll({});
    return res.json(projects);
  }
}

export default Project;
