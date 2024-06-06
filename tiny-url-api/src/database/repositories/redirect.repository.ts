import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ProjectionType } from 'mongoose';

// Schemas
import { Redirect, RedirectDocument } from '../schemas';
import { redirectCreateData } from '../../application/redirect/redirect.contracts';

@Injectable()
export class RedirectRepository {
  constructor(
    @InjectModel(Redirect.name) protected model: Model<RedirectDocument>,
  ) {}

  /**
   *
   * @param data -  Redirect creation data
   * @returns {Redirect} Created entity
   */
  createEntity(data: redirectCreateData): Promise<Redirect> {
    return this.model.create(data);
  }

  /**
   * Finds the redirect by the given params.
   * @param where - Conditions to filter the entities.
   * @param projection - Projection.
   * @returns Entity if found.
   */
  async findOne(
    where: Partial<Redirect> = {},
    projection?: ProjectionType<Redirect>,
  ): Promise<Redirect | null> {
    return this.model.findOne(where, projection).lean();
  }
}
