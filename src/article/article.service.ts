import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private ArticleRepository: Repository<Article>,
  ) {}

  getAll(): Promise<Article[]> {
    return this.ArticleRepository.find();
  }
}
