import { IsNotEmpty, IsUrl } from 'class-validator';

export class DecodeUrlDto {
  @IsNotEmpty()
  @IsUrl()
  url: string;
}
