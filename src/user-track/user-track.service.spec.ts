import { Test, TestingModule } from '@nestjs/testing';
import { UserTrackService } from './user-track.service';

describe('UserTrackService', () => {
  let service: UserTrackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTrackService],
    }).compile();

    service = module.get<UserTrackService>(UserTrackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
