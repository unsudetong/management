import { Get } from '@nestjs/common';
import { Controller, Injectable } from '@nestjs/common';
import { Track } from './entities/track.entity';
import { TrackService } from './track.service';

@Controller('tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async getAll(): Promise<Track[]> {
    return await this.trackService.getAll();
  }
}
