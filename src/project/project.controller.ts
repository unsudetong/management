import { Controller, Get } from '@nestjs/common';
import { Project } from './entities/project.entity';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  getAll(): Promise<Project[]> {
    return this.projectService.getAll();
  }
}
