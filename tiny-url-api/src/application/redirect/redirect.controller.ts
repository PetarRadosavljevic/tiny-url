import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

// Infrastructure
// Services
import { RedirectService } from './redirect.service';

// DTOs
import { TinyUrlResponseDto } from './dtos/redirect-response.dto';
import { CreateTinyUrlRequestDto } from './dtos/create-tiny-url-request.dto';
import { InternalServerErrorException } from '@nestjs/common/exceptions/internal-server-error.exception';
import { ApiInternalServerErrorResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';

@ApiTags('Redirect')
@Controller()
export class RedirectController {
  constructor(private readonly redirectService: RedirectService) {}

  @Post()
  @ApiInternalServerErrorResponse({
    description: 'Failed to create tiny url. Please try again.',
  })
  async createTinyUrl(
    @Body() payload: CreateTinyUrlRequestDto,
  ): Promise<TinyUrlResponseDto> {
    try {
      const tinyUrl = await this.redirectService.createTinyUrl(payload);
      return new TinyUrlResponseDto(tinyUrl);
    } catch (e) {
      throw new InternalServerErrorException(
        'Failed to create tiny url. Please try again.',
      );
    }
  }

  @Get('/:tiny')
  @HttpCode(HttpStatus.FOUND)
  @ApiNotFoundResponse({
    description: 'Url not found.',
  })
  async getRedirect(
    @Param('tiny') tinyUrl: string,
    @Res() res: Response,
  ): Promise<void> {
    const redirect = await this.redirectService.getRedirectByTinyUrl(tinyUrl);
    if (!redirect) {
      throw new NotFoundException('Url not found');
    }

    // We don't want to await this and block the redirect execution
    this.redirectService.logDomainVisit(redirect);

    res.statusCode = 302;
    res.redirect(redirect.originalUrl);
  }
}
