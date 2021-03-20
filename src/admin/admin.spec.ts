import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import dotenv from 'dotenv';
import { User } from '../user/entities/user.entity';
import { UserController } from '../user/user.controller';
import { UserService } from '../user/user.service';
import { database } from '../config/database';
dotenv.config();

describe('AdminController', () => {
  let adminController: AdminController;
  let userController: UserController;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(database.development),
        TypeOrmModule.forFeature([Admin, User]),
      ],
      controllers: [AdminController, UserController],
      providers: [AdminService, UserService],
    }).compile();

    adminController = await moduleRef.resolve<AdminController>(AdminController);
    userController = await moduleRef.resolve<UserController>(UserController);
  });

  describe('should be defined.', () => {
    it('test', async () => {
      expect(adminController).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should have repository defined.', async () => {
      expect(await adminController.findAll()).toBeInstanceOf(Array);
    });
  });

  describe('create', () => {
    it('should create admin.', async () => {
      const beforeAdminCreation = await adminController.findAll();

      const createdUser = await userController.create({
        USER_ID: 'admintest',
        PASSWORD: 'admintest',
      });

      await adminController.create({
        USER_ID: createdUser.ID,
      });
      await userController.delete(createdUser.ID);

      const afterAdminCreation = await adminController.findAll();
      expect(afterAdminCreation.length - beforeAdminCreation.length).toBe(1);
    });
  });

  describe('delete', () => {
    it('should delete admin', async () => {
      const admins = await adminController.findAll();
      const adminsLength = admins.length;
      await adminController.delete(admins[adminsLength - 1].ID);
      const afterAdminDeletion = await adminController.findAll();
      expect(adminsLength - afterAdminDeletion.length).toBe(1);
    });
  });
});
