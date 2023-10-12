import { Test, TestingModule } from '@nestjs/testing';
import { ComponentController } from './component.controller';
import { ComponentService } from './component.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Component } from './entities/component.entity';
import { Server } from '../server/entities/server.entity';
import { ServerController } from '../server/server.controller';
import { ServerService } from '../server/server.service';
import * as dotenv from 'dotenv';

dotenv.config();

const db_options = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'test_db',
};

describe('ComponentController', () => {
  let compController: ComponentController;
  let serverController: ServerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComponentController, ServerController],
      providers: [ComponentService, ServerService],
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          ...db_options,
          entities: [Component, Server],
          synchronize: false,
        }),
        TypeOrmModule.forFeature([Component, Server])
    ]
     }).compile();

    compController = module.get<ComponentController>(ComponentController);
    serverController = module.get<ServerController>(ServerController);
  });


  it('should create a component and asign to a server', async () => {
    
    const aserver = await Promise.all([
      serverController.create({
        id:1,
        brand:"MikroTik",
        model:"VeryGut99",
      }),
    ])

    expect(
      await compController.create({
        id:1,
        brand: "NVIDIA",
        model: "180",
        type: "GPU",
        image: '/assets/noimage.jpg',
        stock: 66,
        quantity: 2,
        isActive: true,
        serverId: 1
      }),
      ).toEqual({
        id:expect.any(Number),
        brand: "NVIDIA",
        model: "180",
        type: "GPU",
        image: '/assets/noimage.jpg',
        stock: 66,
        quantity: 2,
        isActive: true,
        serverId: 1
      });

  });

  /* it('should create 2 components and asign to a server', async () => {
    const aserver = await Promise.all([
      serverController.create({
        id:1,
        brand:"MikroTik",
        model:"VeryGut99",
      }),
    ])
    expect(
      await compController.create({
        id:1,
        brand: "NVIDIA",
        model: "180",
        type: "GPU",
        image: '/assets/noimage.jpg',
        stock: 66,
        quantity: 2,
        isActive: true,
        serverId: aserver.id
        })
      ).toEqual({
        id:expect.any(Number),
        brand: "NVIDIA",
        model: "180",
        type: "GPU",
        image: '/assets/noimage.jpg',
        stock: 66,
        quantity: 2,
        isActive: true,
        serverId: aserver.id
        });
      });
       */
      
});
