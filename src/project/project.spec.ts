import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import dotenv from 'dotenv';
import { NotFoundException } from '@nestjs/common';
import { Track } from '../track/entities/track.entity';
import { Admin } from '../admin/entities/admin.entity';
import { User } from '../user/entities/user.entity';
dotenv.config();

describe('ProjectController', () => {
  let projectController: ProjectController;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT),
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.TEST_DB_NAME,
          entities: [Project, Admin, User, Track],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Project, Admin, User, Track]),
      ],
      controllers: [ProjectController],
      providers: [ProjectService],
    }).compile();

    projectController = await moduleRef.resolve<ProjectController>(
      ProjectController,
    );
  });

  describe('should be defined.', () => {
    it('test', async () => {
      expect(projectController).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should have repository defined.', async () => {
      expect(await projectController.findAll()).toBeInstanceOf(Array);
    });
  });

  describe('findOne', () => {
    it('should return a 404', async () => {
      try {
        await projectController.findOne(99999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  // 지우지 않을 요량으로 100번째 유저와 12번째 트랙을 생성해놨다.
  describe('create', () => {
    it('should create project.', async () => {
      const beforeProjectCreation = await projectController.findAll();
      await projectController.create({
        TITLE: 'testproject',
        WRITER: 4,
        TRACK_ID: 5,
      });
      const afterProjectCreation = await projectController.findAll();
      expect(afterProjectCreation.length - beforeProjectCreation.length).toBe(
        1,
      );
    });
  });

  describe('update', () => {
    it('should update project', async () => {
      const projects = await projectController.findAll();
      const projectsLength = projects.length;
      const createdProject = projects[projectsLength - 1];
      await projectController.update(createdProject.ID, {
        TITLE: 'testproject2',
      });
      const updatedProject = await projectController.findOne(createdProject.ID);
      expect(updatedProject.TITLE).toBe('testproject2');
    });
  });

  describe('delete', () => {
    it('should delete project', async () => {
      const projects = await projectController.findAll();
      const projectsLength = projects.length;
      await projectController.delete(projects[projectsLength - 1].ID);
      const afterProjectDeletion = await projectController.findAll();
      expect(projectsLength - afterProjectDeletion.length).toBe(1);
    });
  });

  describe('findAllOfTrack', () => {
    it('should return array. ', async () => {
      const projects = await projectController.findAllOfTrack(12);
      expect(projects).toBeInstanceOf(Array);
    });
  });
});
