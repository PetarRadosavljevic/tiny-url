import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Schemas
import { DomainVisit, DomainVisitDocument } from '../schemas';
import {
  DomainVisitCreateData,
  DomainVisitsFilterParameters,
  DomainVisitsResults,
} from '../../application/domain-visit/domain-visit.contracts';

@Injectable()
export class DomainVisitRepository {
  constructor(
    @InjectModel(DomainVisit.name) protected model: Model<DomainVisitDocument>,
  ) {}

  /**
   *
   * @param data -  Domain visit creation data
   * @returns {DomainVisit} Created entity
   */
  createEntity(data: DomainVisitCreateData): Promise<DomainVisit> {
    return this.model.create(data);
  }

  /**
   * Compiles data from domain visits by grouping it by name and counting all the visits in last 24 hours
   * @param limit
   * @returns Domain visits results
   */
  getDomainVisits({
    limit,
  }: DomainVisitsFilterParameters): Promise<DomainVisitsResults[]> {
    // Calculate the date and time 24 hours ago
    const timeDiff = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return this.model.aggregate<DomainVisitsResults>([
      {
        $match: {
          createdAt: { $gte: timeDiff }, // Filter documents created in the last 24 hours
        },
      },
      {
        $group: {
          _id: '$name',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          count: 1,
        },
      },
      { $sort: { count: -1 } },
      { $limit: limit },
    ]);
  }
}
