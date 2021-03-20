import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import dotenv from 'dotenv';
import { NotFoundException } from '@nestjs/common';
dotenv.config();

describe('UserController', () => {
  let userController: UserController;

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
          entities: [User],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = await moduleRef.resolve<UserController>(UserController);
  });

  describe('should be defined.', () => {
    it('test', async () => {
      expect(userController).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should have repository defined.', async () => {
      expect(await userController.findAll()).toBeInstanceOf(Array);
    });
  });

  describe('findOne', () => {
    it('should return a 404', async () => {
      try {
        await userController.findOne(99999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create user.', async () => {
      const beforeUserCreation = await userController.findAll();
      await userController.create({
        USER_ID: 'usertest',
        PASSWORD: 'usertest',
      });
      const afterUserCreation = await userController.findAll();
      expect(
        afterUserCreation.length - beforeUserCreation.length,
      ).toBeGreaterThan(0);
    });
  });

  describe('update', () => {
    it('should update user', async () => {
      const users = await userController.findAll();
      const usersLength = users.length;
      const createdUser = users[usersLength - 1];
      await userController.update(createdUser.ID, { NAME: 'test2' });
      const updatedUser = await userController.findOne(createdUser.ID);
      expect(updatedUser.NAME).toBe('test2');
    });
  });

  describe('delete', () => {
    it('should delete user', async () => {
      const users = await userController.findAll();
      const usersLength = users.length;
      await userController.delete(users[usersLength - 1].ID);
      const afterUserDeletion = await userController.findAll();
      expect(usersLength - afterUserDeletion.length).toBeGreaterThan(0);
    });
  });
});
