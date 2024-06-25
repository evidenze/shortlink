import { Test, TestingModule } from '@nestjs/testing';
import { ShortenerService } from './shortener.service';
import { NotFoundException } from '@nestjs/common';

const url = 'http://indicina.com';
const mainUrl = 'http://short.est';

describe('ShortenerService', () => {
  let service: ShortenerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShortenerService],
    }).compile();

    service = module.get<ShortenerService>(ShortenerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should encode a URL', async () => {
    const result = await service.encode(url);
    expect(result.status).toBe(true);
    expect(result.message).toBe('URL has been shortened successfully');
    expect(result.data).toHaveProperty('shortUrl');
    expect(result.data.url).toBe(url);
  });

  it('should decode a URL', async () => {
    const encodeResult = await service.encode(url);
    const shortUrl = encodeResult.data.shortUrl;

    const decodeResult = await service.decode(shortUrl);
    expect(decodeResult.status).toBe(true);
    expect(decodeResult.message).toBe('URL decoded successfully');
    expect(decodeResult.data).toBe(url);
  });

  it('should get statistics for a URL', async () => {
    const encodeResult = await service.encode(url);
    const urlId = encodeResult.data.shortUrl.split('/').pop();

    const statsResult = await service.getStatistics(urlId);
    expect(statsResult.status).toBe(true);
    expect(statsResult.message).toBe('Statistics fetched successfully');
    expect(statsResult.data).toHaveProperty('url', url);
    expect(statsResult.data).toHaveProperty('hits', 0);
    expect(statsResult.data).toHaveProperty('createdAt');
  });

  it('should visit a URL and increment hits', async () => {
    const encodeResult = await service.encode(url);
    const urlId = encodeResult.data.shortUrl.split('/').pop();

    const visitUrl = await service.visitUrl(urlId);
    expect(visitUrl).toBe(url);

    const statsResult = await service.getStatistics(urlId);
    expect(statsResult.data).toHaveProperty('hits', 1);
  });

  it('should throw NotFoundException if short URL not found', async () => {
    const invalidUrlId = 'invalidId';
    await expect(service.decode(`${mainUrl}/${invalidUrlId}`)).rejects.toThrow(
      NotFoundException,
    );
    await expect(service.getStatistics(invalidUrlId)).rejects.toThrow(
      NotFoundException,
    );
    await expect(service.visitUrl(invalidUrlId)).rejects.toThrow(
      NotFoundException,
    );
    await expect(service.incrementHits(invalidUrlId)).rejects.toThrow(
      NotFoundException,
    );
  });
});
