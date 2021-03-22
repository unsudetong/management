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
    const createdProject = await this.projectService.create(projectData);
    return {
      message: '프로젝트를 새로 생성하였습니다.',
      result: createdProject,
    };
  }

  @Get()
  async findAll() {
    const projects = await this.projectService.findAll();
    return {
      message: '프로젝트를 가져왔습니다.',
      result: projects,
    };
  }

  @Get(':id')
  async findOne(@Param('id') projectId: number) {
    const project = await this.projectService.findOne(projectId);
    return {
      message: '단일 프로젝트를 가져왔습니다.',
      result: project,
    };
  }

  @Get(':track_id')
  async findAllOfTrack(@Param('track_id') trackId: number) {
    const projects = await this.projectService.findAllOfTrack(trackId);
    return {
      message: '특정 트랙의 프로젝트를 가져왔습니다.',
      result: projects,
    };
  }

  @Put(':id')
  async update(
    @Param('id') projectId: number,
    @Body() projectData: UpdateProjectDto,
  ) {
    const updatedProject = await this.projectService.update(
      projectId,
      projectData,
    );
    return {
      message: '프로젝트를 수정하였습니다.',
      result: updatedProject,
    };
  }

  @Delete(':id')
  async delete(@Param('id') projectId: number) {
    const deletedProject = await this.projectService.delete(projectId);
    return {
      message: '프로젝트를 삭제하였습니다.',
      result: deletedProject,
    };
  }
}
