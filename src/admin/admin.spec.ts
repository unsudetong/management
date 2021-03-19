import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import dotenv from 'dotenv';
import { User } from '../user/entities/user.entity';
dotenv.config();

describe('AdminController', () => {
  let adminController: AdminController;

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
          entities: [Admin, User],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Admin, User]),
      ],
      controllers: [AdminController],
      providers: [AdminService],
    }).compile();

    adminController = await moduleRef.resolve<AdminController>(AdminController);
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
});
