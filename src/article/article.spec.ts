import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import dotenv from 'dotenv';
import { NotFoundException } from '@nestjs/common';
import { Project } from '../project/entities/project.entity';
import { Admin } from '../admin/entities/admin.entity';
import { User } from '../user/entities/user.entity';
import { Track } from '../track/entities/track.entity';
dotenv.config();

describe('ArticleController', () => {
  let articleController: ArticleController;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT),
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.TEST_DB_NAME,
          entities: [Article, Project, Admin, User, Track],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Article, Project, Admin, User, Track]),
      ],
      controllers: [ArticleController],
      providers: [ArticleService],
    }).compile();

    articleController = await moduleRef.resolve<ArticleController>(
      ArticleController,
    );
  });

  describe('should be defined.', () => {
    it('test', async () => {
      expect(articleController).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should have repository defined.', async () => {
      expect(await articleController.findAll()).toBeInstanceOf(Array);
    });
  });

  describe('findOne', () => {
    it('should return a 404', async () => {
      try {
        await articleController.findOne(99999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create article.', async () => {
      const beforeArticleCreation = await articleController.findAll();
      await articleController.create({
        TITLE: 'testarticle',
        CONTENTS: 'testarticle',
        ADMIN_ID: 4,
        PROJECT_ID: 12,
      });
      const afterArticleCreation = await articleController.findAll();
      expect(afterArticleCreation.length - beforeArticleCreation.length).toBe(
        1,
      );
    });
  });

  describe('update', () => {
    it('should update article', async () => {
      const articles = await articleController.findAll();
      const articlesLength = articles.length;
      const createdArticle = articles[articlesLength - 1];
      await articleController.update(createdArticle.ID, { TITLE: 'test2' });
      const updatedArticle = await articleController.findOne(createdArticle.ID);
      expect(updatedArticle.TITLE).toBe('test2');
    });
  });

  describe('delete', () => {
    it('should delete article', async () => {
      const articles = await articleController.findAll();
      const articlesLength = articles.length;
      await articleController.delete(articles[articlesLength - 1].ID);
      const afterArticleDeletion = await articleController.findAll();
      expect(articlesLength - afterArticleDeletion.length).toBeGreaterThan(0);
    });
  });
});
