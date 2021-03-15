import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track) private trackRepository: Repository<Track>,
  ) {}

  getAll(): Promise<Track[]> {
    return this.trackRepository.find();
  }
}
