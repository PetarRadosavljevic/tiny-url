// Schema
import { DomainVisitsResults } from '../domain-visit.contracts';

export class DomainVisitsResponseDto {
  data: DomainVisitsResults[];

  constructor(domainVisitsResults: DomainVisitsResults[]) {
    this.data = domainVisitsResults;
  }
}
