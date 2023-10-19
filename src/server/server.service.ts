import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Server } from './entities/server.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class ServerService {
  constructor(
    @InjectRepository(Server)
    private serverRepository: Repository<Server>, )
    {}
  
  create(createServerDto: CreateServerDto) {
    return this.serverRepository.save(createServerDto);
  }

  findAll() {
    return this.serverRepository.find({
/*       relations:{
        component: true
      }, */
    });
  }

  async findOne(id: number): Promise <Server | null> {
    /* return this.serverRepository.findOneBy({ id }); */
    try {
      const server = await this.serverRepository.findOneBy({
        id,
      } as FindOptionsWhere<Server>);
      if (server === null) {
        throw new HttpException('ID Not Found', HttpStatus.BAD_REQUEST);
      }
      return server;  
    } catch (error) {
      console.error(`ERROR: ${error}`)
    }
    
  }

  async update(id: number, updateServerDto: UpdateServerDto) {
    try {
      await this.serverRepository.update({ id }, updateServerDto)
      return await this.findOne(id);  
    } catch (error) {
      console.error(`ERROR: ${error}`)
    }
    
  }

  async remove(id: number): Promise<void> {
    /* await this.serverRepository.delete(id); */
    try {
      const del = await this.findOne(id);
      if (del === null) {
        throw new HttpException('ID Not Found', HttpStatus.BAD_REQUEST);
      } else {
        await this.serverRepository.delete(id);
      }
    } catch (error) {
      console.error(`ERROR: ${error}`)
    }

  }
}
