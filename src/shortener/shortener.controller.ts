import { Controller, Post, Body, Get, Param, Redirect } from '@nestjs/common';
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

  @Get('statistic/:id')
  async getStatistics(@Param('id') id: string) {
    return await this.shortenerService.getStatistics(id);
  }

  @Get(':id')
  @Redirect()
  async redirect(@Param('id') id: string) {
    return await this.shortenerService.visitUrl(id);
  }
}
