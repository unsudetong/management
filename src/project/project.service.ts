import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create.project.dto';
import { UpdateProjectDto } from './dto/update.project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
  ) {}

  async create(projectData: CreateProjectDto) {
    return await this.projectRepository.save(projectData);
  }

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find();
  }

  async findOne(projectId: number) {
    const project = await this.projectRepository.findOne(projectId);
    if (!project) {
      throw new NotFoundException(`Project with ID : ${projectId} not found.`);
    }
    return project;
  }

  async findAllOfTrack(trackId: number) {
    const projects = await this.projectRepository.find({
      where: {
        TRACK_ID: trackId,
      },
    });
    if (!projects) {
      throw new NotFoundException(
        `Projects with TRACK_ID : ${trackId} not found.`,
      );
    }
    return projects;
  }

  async update(projectId: number, projectData: UpdateProjectDto) {
    return this.projectRepository.save({ ...projectData, ID: projectId });
  }

  async delete(projectId: number) {
    return this.projectRepository.delete(projectId);
  }
}
