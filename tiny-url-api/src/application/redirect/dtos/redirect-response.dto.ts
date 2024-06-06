// Schema
import { Redirect } from '../../../database/schemas';

export class TinyUrlResponseDto {
  url: string;

  constructor(redirect: Redirect) {
    this.url = redirect.tinyUrl;
  }
}
