import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create.project.dto';
import { UpdateProjectDto } from './dto/update.project.dto';
import { Project } from './entities/project.entity';
import { ProjectService } from './project.service';

@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async create(@Body() projectData: CreateProjectDto) {
    return await this.projectService.create(projectData);
  }

  @Get()
  async findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') projectId: number): Promise<Project> {
    return this.projectService.findOne(projectId);
  }

  @Get(':track_id')
  async findAllOfTrack(@Param('track_id') trackId: number) {
    return this.projectService.findAllOfTrack(trackId);
  }

  @Put(':id')
  async update(
    @Param('id') projectId: number,
    @Body() projectData: UpdateProjectDto,
  ) {
    return this.projectService.update(projectId, projectData);
  }

  @Delete(':id')
  async delete(@Param('id') projectId: number) {
    return this.projectService.delete(projectId);
  }
}
