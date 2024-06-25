import { Controller, Post, Body } from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { EncodeUrlDto } from './dto/encode.dto';
import { DecodeUrlDto } from './dto/decode.dto';

@Controller()
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @Post('encode')
  async encode(@Body() data: EncodeUrlDto) {
    return await this.shortenerService.encode(data.url);
  }

  @Post('decode')
  async decode(@Body() data: DecodeUrlDto) {
    return await this.shortenerService.decode(data.url);
  }
}
