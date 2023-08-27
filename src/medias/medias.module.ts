import { Module } from '@nestjs/common';
import { MediasRepository} from './medias.repository';
import { MediasController } from './medias.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { MediasService } from './medias.services';

@Module({
  imports: [PrismaModule],
  controllers: [MediasController],
  providers: [MediasService, MediasRepository],
})
export class MediasModule {}
