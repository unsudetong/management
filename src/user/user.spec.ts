import { Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import dotenv from 'dotenv';
import { UserModule } from './user.module';
import user from '../models/user';
dotenv.config();

describe('UserController', () => {
  const mockRepository = {
    metaData: {
      column: [{ propertyName: 'ID', isPrimary: true }],
      relations: [],
    },
  };
  let userController: UserController;
  let userService: UserService;

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

    userService = await moduleRef.resolve<UserService>(UserService);
    userController = await moduleRef.resolve<UserController>(UserController);
  });

  describe('findAll', () => {
    it('should have repository defined.', async () => {
      expect(await userController.findAll()).toBeInstanceOf(Array);
    });
  });

  describe('create', () => {
    it('should create user.', async () => {
      const beforeUserCreation = await userController.findAll();
      await userController.create({
        USER_ID: 'test',
        PASSWORD: 'test',
      });
      const afterUserCreation = await userController.findAll();
      expect(afterUserCreation.length - beforeUserCreation.length).toBe(1);
    });

    it('should delete user', async () => {
      const users = await userController.findAll();
      const usersLength = users.length;
      const createdUser = users[usersLength - 1];
      // const createdUserPassword = createdUser.PASSWORD;
      await userController.update(createdUser.ID, { PASSWORD: 'test2' });
      const updatedUser = await userController.findOne(createdUser.ID);
      console.log(updatedUser);
      expect(updatedUser.PASSWORD).toBe('test2');

      await userController.delete(users[users.length - 1].ID);
      const afterUserDeletion = await userController.findAll();
      expect(usersLength - afterUserDeletion.length).toBe(1);
    });
  });
});
