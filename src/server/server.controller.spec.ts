import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Server } from '../server/entities/server.entity';
import * as dotenv from 'dotenv';
import { ServerController } from './server.controller';
import { ServerService } from './server.service';
import { Component } from '../component/entities/component.entity';

dotenv.config();

const db_options = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'test_db',
};

describe('ServerController', () => {
  let serverController: ServerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServerController],
      providers: [ServerService],
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          ...db_options,
          entities: [Component, Server],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Component, Server])
    ]
     }).compile();

     serverController = module.get<ServerController>(ServerController);
  });

  it('should create a server', async () => {
    expect(
      await serverController.create({
      id:1,
      brand: "MikroTik",
      model: "999",
      }),
      ).toEqual({
        id:expect.any(Number),
        brand: "Supreme",
        model: "999",
        });
    });
});
