import { Test, TestingModule } from '@nestjs/testing';
import { ServerController } from './server.controller';
import { ServerService } from './server.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Component } from '../component/entities/component.entity';
import { Server } from './entities/server.entity';
import * as dotenv from 'dotenv';

  dotenv.config();

  const db_options = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'test_db',
  };
  
  describe('ServerController', () => {
    let controller: ServerController;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [ServerController],
        providers: [ServerService],
        imports: [
          TypeOrmModule.forRoot({
            type: 'postgres',
            ...db_options,
            entities: [Component, Server],
            synchronize: false,
            /* autoLoadEntities: true */
          }),
          TypeOrmModule.forFeature([Server])
      ]
      /* Agregar Componentes a la tabla */
    
  /*   afterEach(async () => {
        const dataSource = app.get(DataSource);
        await dataSource.createQueryBuilder().delete().from(User).execute();
      });     */
  
       }).compile();
  
      controller = module.get<ServerController>(ServerController);
    });

    it('should create 2 servers', async () => {
      expect(
        controller.create({
          id:1,
          brand: "MikroTik",
          model: "911 Lite5 ac",
          }),
        ).toStrictEqual({
          id:expect.any(Number),
          brand: "MikroTik",
          model: "911 Lite5 ac",
          });
      expect(
        controller.create({
          id:1,
          brand: "MikroTik",
          model: "CCR1009-7G-1C-1S+",
          }),
        ).toStrictEqual({
          id:expect.any(Number),
          brand: "MikroTik",
          model: "CCR1009-7G-1C-1S+",
          });      

  });
});
