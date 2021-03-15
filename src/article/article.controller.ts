import { Get } from '@nestjs/common';
import { Controller, Injectable } from '@nestjs/common';
import { Article } from './entities/article.entity';
import { ArticleService } from './article.service';

@Controller()
export class ArticleController {
  constructor(private readonly ArticleService: ArticleService) {}

  @Get()
  async getAll(): Promise<Article[]> {
    return await this.ArticleService.getAll();
  }
}
