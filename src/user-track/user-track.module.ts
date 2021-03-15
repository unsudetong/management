import { Module } from '@nestjs/common';
import { UserTrackController } from './user-track.controller';
import { UserTrackService } from './user-track.service';

@Module({
  controllers: [UserTrackController],
  providers: [UserTrackService]
})
export class UserTrackModule {}
