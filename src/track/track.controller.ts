import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Controller, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { TrackService } from './track.service';

@Controller()
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  async create(@Body() trackData: CreateTrackDto) {
    const createdTrack = await this.trackService.create(trackData);
    return createdTrack;
  }

  @Get()
  async findAll(): Promise<Track[]> {
    return await this.trackService.findAll();
  }

  @Get(':id')
  async findOne(@Param() trackId: number) {
    return await this.trackService.findOne(trackId);
  }

  @Put(':id')
  async update(@Param() trackId: number, trackData: UpdateTrackDto) {
    return await this.trackService.update(trackId, trackData);
  }

  @Delete(':id')
  async delete(@Param() trackId: number) {
    return await this.trackService.delete(trackId);
  }
}
