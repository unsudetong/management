import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track) private trackRepository: Repository<Track>,
  ) {}

  async create(trackData: CreateTrackDto): Promise<CreateTrackDto & Track> {
    return await this.trackRepository.save(trackData);
  }

  async findAll(): Promise<Track[]> {
    return await this.trackRepository.find();
  }

  async findOne(trackId: number) {
    return await this.trackRepository.findOne(trackId);
  }

  async update(trackId: number, trackData: UpdateTrackDto) {
    return await this.trackRepository.save({ ...trackData, ID: trackId });
  }

  async delete(trackId: number) {
    return await this.trackRepository.delete(trackId);
  }
}
