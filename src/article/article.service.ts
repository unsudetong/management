import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private ArticleRepository: Repository<Article>,
  ) {}

  async create(articleData: CreateArticleDto) {
    return await this.ArticleRepository.save(articleData);
  }

  async findAll(): Promise<Article[]> {
    return await this.ArticleRepository.find();
  }

  async findOne(articleId: number) {
    const article = await this.ArticleRepository.findOne(articleId);
    if (!article) {
      throw new NotFoundException(`Article with ID : ${articleId} not found.`);
    }
    return article;
  }

  async update(articleId: number, articleData: UpdateArticleDto) {
    return this.ArticleRepository.save({ ...articleData, ID: articleId });
  }

  async delete(articleId: number) {
    return this.ArticleRepository.delete(articleId);
  }
}
