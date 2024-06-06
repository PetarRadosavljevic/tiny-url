import { Injectable } from '@nestjs/common';

// Schemas
// Repositories
import { DomainVisitRepository } from '../../database/repositories';
import {
  DomainVisitsFilterParameters,
  DomainVisitsResults,
} from './domain-visit.contracts';

@Injectable()
export class DomainVisitService {
  constructor(private readonly domainVisitRepository: DomainVisitRepository) {}

  /**
   * Retrieves domain visits data from db
   * @param payload - Payload parameters
   * @returns Domain visits data
   */
  getDomainVisits(
    payload: DomainVisitsFilterParameters,
  ): Promise<DomainVisitsResults[]> {
    return this.domainVisitRepository.getDomainVisits(payload);
  }
}
