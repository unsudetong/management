import model from '../models/article';
import { Request, Response, NextFunction } from 'express';

class Article {
  static async getAllArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const [articles] = await model.findAll();
      return res
        .status(200)
        .json({ message: '게시글의 목록입니다.', result: articles });
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        message: '게시글 정보를 가져오는 데에서 오류가 발생하였습니다.',
      });
    }
  }

  static async getOneArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const { ARTICLE_ID } = req.params;
      const [articles] = await model.findAllWhere(ARTICLE_ID);
      return res.status(200).json({
        message: '특정 게시글입니다.',
        result: articles[0],
      });
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        message: '특정 게시글을 가져오는 데에 실패하였습니다.',
      });
    }
  }

  static async createOneArticle(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { TITLE, PROJECT_ID, CONTENTS, ADMIN_ID, ORDER } = await req.body;
      const newArticle = await model.create({
        PROJECT_ID,
        TITLE,
        CONTENTS,
        ADMIN_ID,
        ORDER,
      });

      return res.status(201).json({
        message: '해당 프로젝트에 게시글을 등록하는 데에 성공하였습니다.',
        result: newArticle,
      });
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: '게시글 생성에 실패하였습니다.' });
    }
  }

  static async deleteOneArticle(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { ARTICLE_ID } = await req.params;
      await model.destroy(ARTICLE_ID);
      return res.status(200).json({ message: '게시글이 삭제되었습니다.' });
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: '게시글 삭제에 실패하였습니다.' });
    }
  }
}

export default Article;
