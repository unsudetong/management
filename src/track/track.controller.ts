import { Body, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/auth.jwt.guard';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { TrackService } from './track.service';

@Controller()
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  async create(@Body() @Body() trackData: CreateTrackDto) {
    const createdTrack = await this.trackService.create(trackData);
    return createdTrack;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Track[]> {
    return await this.trackService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') trackId: number) {
    return await this.trackService.findOne(trackId);
  }

  @Put(':id')
  async update(
    @Param('id') trackId: number,
    @Body() trackData: UpdateTrackDto,
  ) {
    return await this.trackService.update(trackId, trackData);
  }

  @Delete(':id')
  async delete(@Param('id') trackId: number) {
    return await this.trackService.delete(trackId);
  }
}
