import { Test, TestingModule } from '@nestjs/testing';
import { UserTrackController } from './user-track.controller';

describe('UserTrackController', () => {
  let controller: UserTrackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTrackController],
    }).compile();

    controller = module.get<UserTrackController>(UserTrackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
