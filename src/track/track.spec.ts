import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import dotenv from 'dotenv';
import { database } from '../config/database';
dotenv.config();

describe('TrackController', () => {
  let trackController: TrackController;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(database.development),
        TypeOrmModule.forFeature([Track]),
      ],
      controllers: [TrackController],
      providers: [TrackService],
    }).compile();

    trackController = await moduleRef.resolve<TrackController>(TrackController);
  });

  describe('should be defined.', () => {
    it('test', async () => {
      expect(trackController).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should have repository defined.', async () => {
      expect(await trackController.findAll()).toBeInstanceOf(Array);
    });
  });

  describe('create', () => {
    it('should create track', async () => {
      const beforeTrackCreation = await trackController.findAll();
      await trackController.create({
        DEPARTMENT: 'testtrack',
      });
      const afterTrackCreation = await trackController.findAll();
      expect(afterTrackCreation.length - beforeTrackCreation.length).toBe(1);
    });
  });

  describe('update', () => {
    it('should update track', async () => {
      const tracks = await trackController.findAll();
      const tracksLength = tracks.length;
      const createdTrack = tracks[tracksLength - 1];
      await trackController.update(createdTrack.ID, { DEPARTMENT: 'test2' });
      const updatedTrack = await trackController.findOne(createdTrack.ID);
      expect(updatedTrack.DEPARTMENT).toBe('test2');
    });
  });

  describe('delete', () => {
    it('should delete track', async () => {
      const tracks = await trackController.findAll();
      const tracksLength = tracks.length;
      await trackController.delete(tracks[tracksLength - 1].ID);
      const afterTrackDeletion = await trackController.findAll();
      expect(tracksLength - afterTrackDeletion.length).toBe(1);
    });
  });
});
