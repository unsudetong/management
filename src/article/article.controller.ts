import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Controller, Injectable } from '@nestjs/common';
import { Article } from './entities/article.entity';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller()
export class ArticleController {
  constructor(private readonly ArticleService: ArticleService) {}

  @Post()
  async create(@Body() articleData: CreateArticleDto) {
    return await this.ArticleService.create(articleData);
  }

  @Get()
  async findAll(): Promise<Article[]> {
    return await this.ArticleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') articleId: number): Promise<Article> {
    return this.ArticleService.findOne(articleId);
  }

  @Put(':id')
  async update(
    @Param('id') articleId: number,
    @Body() articleData: UpdateArticleDto,
  ) {
    return this.ArticleService.update(articleId, articleData);
  }

  @Delete(':id')
  async delete(@Param('id') articleId: number) {
    return this.ArticleService.delete(articleId);
  }
}
