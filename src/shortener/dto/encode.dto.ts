import { IsNotEmpty, IsUrl } from 'class-validator';

export class EncodeUrlDto {
  @IsNotEmpty()
  @IsUrl()
  url: string;
}
