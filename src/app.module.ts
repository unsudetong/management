import {
  MiddlewareConsumer,
  Module,
  NestMiddleware,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
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
import { ApiModule } from './api.module';
import { database } from './config/database';

import { CompressionMiddleware } from '@nest-middlewares/compression';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { CorsMiddleware } from '@nest-middlewares/cors';

import dotenv from 'dotenv';
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
    TypeOrmModule.forRoot(database.production),
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HelmetMiddleware, CompressionMiddleware, CorsMiddleware)
      .forRoutes({ path: 'api/', method: RequestMethod.ALL });
  }
}
