import { IsUrl } from 'class-validator';

export class CreateTinyUrlRequestDto {
  @IsUrl(undefined, {
    message: 'Url must be a URL address',
  })
  readonly url: string;
}
