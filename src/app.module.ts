import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServerModule } from './server/server.module';
import { ComponentModule } from './component/component.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Component } from './component/entities/component.entity';
import { Server } from './server/entities/server.entity';

dotenv.config();

const db_options = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === "true",

};

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...db_options,
      entities: [Component, Server],
      synchronize: true,
      extra: {
        ssl:
          process.env.POSTGRES_SSL === "true"
            ? {
                rejectUnauthorized: false,
              }
            : null,
      },
    }),
    ServerModule, ComponentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
