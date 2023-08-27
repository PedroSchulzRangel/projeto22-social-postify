import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { MediasRepository } from './medias.repository';

@Injectable()
export class MediasService {
    constructor(private readonly mediasRepository: MediasRepository) {}

    async createMedia(createMediaDto: CreateMediaDto){
        if(!createMediaDto.title || !createMediaDto.username) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
        
        const titleAndUsernameInUse = await this.mediasRepository.findMediaByTitleAndUsername(createMediaDto);
        
        if(titleAndUsernameInUse) throw new HttpException('Conflict', HttpStatus.CONFLICT);

        const media = await this.mediasRepository.create(createMediaDto);

        return media;
    }
}