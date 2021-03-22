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

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() @Body() trackData: CreateTrackDto) {
    const createdTrack = await this.trackService.create(trackData);
    return {
      message: '트랙을 생성하였습니다.',
      result: createdTrack,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    const tracks = await this.trackService.findAll();
    return {
      message: '트랙을 가져왔습니다.',
      result: tracks,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') trackId: number) {
    const track = await this.trackService.findOne(trackId);
    return {
      message: '단일 트랙을 가져왔습니다.',
      result: track,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') trackId: number,
    @Body() trackData: UpdateTrackDto,
  ) {
    const updatedTrack = await this.trackService.update(trackId, trackData);
    return {
      message: '트랙을 수정하였습니다.',
      result: updatedTrack,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') trackId: number) {
    const deletedTrack = await this.trackService.delete(trackId);
    return {
      message: '트랙을 삭제하였습니다.',
      result: deletedTrack,
    };
  }
}
