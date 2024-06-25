import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

const mainUrl = `http://short.est`;

@Injectable()
export class ShortenerService {
  private urlDatabase: {
    [key: string]: { url: string; hits: number; createdAt: Date };
  } = {};

  /**
   * Encode URL.
   *
   * @param url
   * @returns {object}
   */
  async encode(url: string): Promise<any> {
    const id = uuidv4().slice(0, 6);
    this.urlDatabase[id] = { url, hits: 0, createdAt: new Date() };

    return {
      status: true,
      message: 'URL has been shortened successfully',
      data: {
        shortUrl: `${mainUrl}/${id}`,
        url,
      },
    };
  }

  /**
   * Decode URL.
   *
   * @param urlId
   * @returns
   */
  async decode(shortUrl: string): Promise<any> {
    const id = shortUrl.split('/').pop();
    const record = this.urlDatabase[id];

    if (!record) {
      throw new NotFoundException('Short URL not found');
    }

    return {
      status: true,
      message: 'URL decoded successfully',
      data: record.url,
    };
  }
}
