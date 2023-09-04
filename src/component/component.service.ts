import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Component } from './entities/component.entity';
import { Repository } from 'typeorm/repository/Repository';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class ComponentService {
  constructor(
    @InjectRepository(Component)
    private componentRepository: Repository<Component>, )
    {}

  create(createComponentDto: CreateComponentDto){
    return this.componentRepository.save(createComponentDto);
  }

  findAll() {
    return this.componentRepository.find({
      relations: {
        server: true
      },
    });
  }  

  async findOne(id: number): Promise <Component | null> {
    /* return this.componentRepository.findOneBy({ id }); */
    try {
        const component = await this.componentRepository.findOneBy({
        id,
        } as FindOptionsWhere<Component>);
      if (component === null) {
        throw new HttpException('ID Not Found', HttpStatus.BAD_REQUEST);
      }
      return component;
      } catch (error) {
      console.error(`ERROR: ${error}`)
    }
    
  }

  async update(id: number, updateComponentDto: UpdateComponentDto) {
    try {
      await this.componentRepository.update({ id }, updateComponentDto)
      return await this.findOne(id);  
    } catch (error) {
      console.error(`ERROR: ${error}`)
    }
    
  }

  async remove(id: number): Promise<void> {
    /* await this.componentRepository.delete(id); */
    try {
      const del = await this.findOne(id);
      if (del === null) {
        throw new HttpException('ID Not Found', HttpStatus.BAD_REQUEST);
      } else {
        await this.componentRepository.delete(id);
      }
    } catch (error) {
      console.error(`ERROR: ${error}`)
    }
  }
}
