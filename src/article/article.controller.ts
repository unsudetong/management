import { Body, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
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
    const createdArticle = await this.ArticleService.create(articleData);
    return {
      message: '게시글 데이터를 새로 생성하였습니다.',
      result: createdArticle,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    const articles = await this.ArticleService.findAll();
    return {
      message: '게시글 데이터를 가져왔습니다.',
      result: articles,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') articleId: number) {
    const article = await this.ArticleService.findOne(articleId);
    return {
      message: '단일 게시글을 가져왔습니다.',
      result: article,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') articleId: number,
    @Body() articleData: UpdateArticleDto,
  ) {
    const updatedArticle = await this.ArticleService.update(
      articleId,
      articleData,
    );
    return {
      message: '게시글을 수정하였습니다.',
      result: updatedArticle,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') articleId: number) {
    const deletedArticle = await this.ArticleService.delete(articleId);
    return {
      message: '게시글을 삭제하였습니다.',
      result: deletedArticle,
    };
  }
}
