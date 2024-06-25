import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ShortenerModule } from './shortener.module';
import { ShortenerService } from './shortener.service';

const url = 'http://indicina.com';
const shortUrl = 'http://short.est/abc123';

describe('ShortenerController (e2e)', () => {
  let app: INestApplication;
  const shortenerService = {
    encode: async (url: string) => ({
      status: true,
      message: 'URL has been shortened successfully',
      data: {
        shortUrl,
        url,
      },
    }),
    decode: async () => ({
      status: true,
      message: 'URL decoded successfully',
      data: url,
    }),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ShortenerModule],
    })
      .overrideProvider(ShortenerService)
      .useValue(shortenerService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/POST encode', () => {
    return request(app.getHttpServer())
      .post('/encode')
      .send({ url })
      .expect(201)
      .expect((res) => {
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe('URL has been shortened successfully');
        expect(res.body.data).toHaveProperty('shortUrl');
        expect(res.body.data).toHaveProperty('url', `${url}`);
      });
  });

  it('/POST decode', () => {
    return request(app.getHttpServer())
      .post('/decode')
      .send({ url: shortUrl })
      .expect(201)
      .expect((res) => {
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe('URL decoded successfully');
        expect(res.body.data).toBe(url);
      });
  });
});
