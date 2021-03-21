import { Body, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { Article } from './entities/article.entity';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { JwtAuthGuard } from '../auth/guards/auth.jwt.guard';

@Controller()
export class ArticleController {
  constructor(private readonly ArticleService: ArticleService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() articleData: CreateArticleDto) {
    return await this.ArticleService.create(articleData);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Article[]> {
    return await this.ArticleService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') articleId: number): Promise<Article> {
    return this.ArticleService.findOne(articleId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') articleId: number,
    @Body() articleData: UpdateArticleDto,
  ) {
    return this.ArticleService.update(articleId, articleData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') articleId: number) {
    return this.ArticleService.delete(articleId);
  }
}
