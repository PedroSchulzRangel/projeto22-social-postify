import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { PrismaModule } from '../src/prisma/prisma.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = await moduleFixture.resolve(PrismaService);
    await prisma.media.deleteMany();
    await app.init();
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect("I'm okay!");
  });

  it('/media (POST) - valid body', async () => {
    await request(app.getHttpServer())
      .post('/medias')
      .send({
        title: "Instagram",
        username: "myusername",
      })
      .expect(HttpStatus.CREATED);
  });
  
  it('/media (POST) - invalid body', async () => {
    await request(app.getHttpServer())
      .post('/medias')
      .send({
        username: "myusername",
      })
      .expect(HttpStatus.BAD_REQUEST);
  });
  
  it('/media (POST) - title and username already exists', async () => {
    await request(app.getHttpServer())
      .post('/medias')
      .send({
        title: "Instagram",
        username: "myusername",
      })
      .expect(HttpStatus.CREATED);
      
      await request(app.getHttpServer())
      .post('/medias')
      .send({
        title: "Instagram",
        username: "myusername",
      })
      .expect(HttpStatus.CONFLICT);
  });

});
