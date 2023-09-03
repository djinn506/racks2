import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServerModule } from './server/server.module';
import { ComponentModule } from './component/component.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Component } from './component/entities/component.entity';
import { Server } from './server/entities/server.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      /*...db_options,*/
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'secret123!',
      database: 'servers',
      entities: [Component, Server],
      synchronize: true,
    }),
    ServerModule, ComponentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
