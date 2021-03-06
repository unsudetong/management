import model from '../models/track';
import { Request, Response } from 'express';

class Track {
  static async getAllTrack(req: Request, res: Response) {
    try {
      const [tracks] = await model.findAll();
      return res
        .status(200)
        .json({ message: '트랙의 목록입니다.', result: tracks });
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        message: '트랙 정보를 가져오는 데에서 오류가 발생하였습니다.',
      });
    }
  }

  static async createOneTrack(req: Request, res: Response) {
    try {
      const { DEPARTMENT, ORDER } = await req.body;
      const newTrack = await model.create({ DEPARTMENT, ORDER });
      return res
        .status(201)
        .json({ message: '트랙 생성에 성공하였습니다.', result: newTrack });
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: '트랙 생성에 실패하였습니다.' });
    }
  }

  static async deleteOneTrack(req: Request, res: Response) {
    try {
      const { TRACK_ID } = await req.params;
      await model.destroy(TRACK_ID);
      return res.status(200).json({ message: '트랙이 삭제되었습니다.' });
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: '트랙 삭제에 실패하였습니다.' });
    }
  }
}

export default Track;
