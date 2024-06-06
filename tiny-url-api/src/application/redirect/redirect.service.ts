import { Injectable } from '@nestjs/common';

// Schemas
import { Redirect } from '../../database/schemas';

// Contracts
import { createTinyUrlPayload } from './redirect.contracts';

// Repositories
import {
  DomainVisitRepository,
  RedirectRepository,
} from '../../database/repositories';
import { createTinyUrlString } from '../../infrastructure/utils/identifier.utils';

@Injectable()
export class RedirectService {
  constructor(
    private readonly redirectRepository: RedirectRepository,
    private readonly domainVisitRepository: DomainVisitRepository,
  ) {}

  /**
   * Creates Redirect for entity.
   * In case of collision of created tiny url we retry 5 times before trowing error.
   * @param payload -  Create Tiny Url payload/
   * @throws {Error} Failed to create short url!
   * @returns Redirect if created
   */
  async createTinyUrl(payload: createTinyUrlPayload): Promise<Redirect> {
    let counter = 0;
    let success = false;
    let redirect: Redirect | null = null;
    while (!success) {
      try {
        redirect = await this.redirectRepository.createEntity({
          originalUrl: payload.url,
          tinyUrl: createTinyUrlString(),
        });
        success = true;
      } catch (e) {
        // We want to retry only if the fail is case of unique index fail.
        // Code 11000 represents unique constraint failed
        if (e.code !== 11000) {
          throw new Error(`Failed to create short url!`);
        }
        counter++;
        // We are trying 5 times
        if (counter > 5) {
          throw new Error(`Failed to create short url!`);
        }
      }
    }

    // This is just for ts safety
    if (!redirect) {
      throw new Error(`Failed to create short url!`);
    }

    return redirect;
  }

  /**
   * Finds redirect by passed tinyUrl
   * @param tinyUrl
   * @returns Redirect if found
   */
  getRedirectByTinyUrl(tinyUrl: string): Promise<Redirect | null> {
    return this.redirectRepository.findOne({ tinyUrl });
  }

  /**
   * Logs the visit of domain for given redirect original url.
   * @param redirect - Redirect entity
   */
  async logDomainVisit(redirect: Redirect): Promise<void> {
    // We are not concerned if this passes we don't want to trow this error so we just console log it.
    try {
      const urlObject = new URL(redirect.originalUrl);
      await this.domainVisitRepository.createEntity({
        name: urlObject.hostname,
      });
    } catch (e) {
      console.error('Domain visit log create fail');
    }
  }
}
