import { Module } from '@nestjs/common';
import { ComponentService } from './component.service';
import { ComponentController } from './component.controller';
import { Component } from './entities/component.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Component])],
  controllers: [ComponentController],
  providers: [ComponentService],
})
export class ComponentModule {}
