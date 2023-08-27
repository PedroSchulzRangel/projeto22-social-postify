import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MediasRepository {

  constructor(private readonly prisma: PrismaService){}

  async findMediaByTitleAndUsername(data: CreateMediaDto){
    return await this.prisma.media.findFirst({
      where: {title: data.title,
              username: data.username}
    });
  }
  
  async create(data: CreateMediaDto) {
    return await this.prisma.media.create({
      data
    });
  }

  findAll() {
    return `This action returns all medias`;
  }

  findOne(id: number) {
    return `This action returns a #${id} media`;
  }

  update(id: number, updateMediaDto: UpdateMediaDto) {
    return `This action updates a #${id} media`;
  }

  remove(id: number) {
    return `This action removes a #${id} media`;
  }
}
