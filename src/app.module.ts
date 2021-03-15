import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { AdminModule } from './admin/admin.module';
import { ProjectModule } from './project/project.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';
import { UserTrackModule } from './user-track/user-track.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MorganModule, MorganInterceptor } from 'nest-morgan';
import { RouterModule, Routes } from 'nest-router';

import path from 'path';
import dotenv from 'dotenv';
import { ApiModule } from './api.module';
dotenv.config();

const routes: Routes = [
  {
    path: '/api',
    module: ApiModule,
    children: [
      { path: '/users', module: UserModule },
      { path: '/articles', module: ArticleModule },
      { path: '/admins', module: AdminModule },
      { path: '/projects', module: ProjectModule },
      { path: '/tracks', module: TrackModule },
      { path: '/user-tracks', module: UserTrackModule },
    ],
  },
];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [path.join(__dirname, '/**/*.entity.js')],
      synchronize: false,
    }),
    RouterModule.forRoutes(routes),
    UserModule,
    ArticleModule,
    AdminModule,
    ProjectModule,
    TrackModule,
    UserTrackModule,
    MorganModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('dev'),
    },
  ],
  controllers: [],
})
export class AppModule {}
