import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// Services
import { DomainVisitService } from './domain-visit.service';

// DTOs
import { DomainVisitsRequestDto } from './dtos/domain-visits-request.dto';
import { DomainVisitsResponseDto } from './dtos/domain-visits-response.dto';

@ApiTags('Domain Visits')
@Controller('domain-visits')
export class DomainVisitController {
  constructor(private readonly domainVisitService: DomainVisitService) {}

  @Get()
  async getRedirect(
    @Query() payload: DomainVisitsRequestDto,
  ): Promise<DomainVisitsResponseDto> {
    const data = await this.domainVisitService.getDomainVisits(payload);
    return new DomainVisitsResponseDto(data);
  }
}
