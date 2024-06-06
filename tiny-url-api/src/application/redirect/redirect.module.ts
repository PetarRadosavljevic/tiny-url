import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Schemas
import {
  DomainVisit,
  DomainVisitSchema,
  Redirect,
  RedirectSchema,
} from '../../database/schemas';

//Modules
import { ApplicationConfigModule } from '../../infrastructure/config/config.module';

// Controllers
import { RedirectController } from './redirect.controller';

// Services
import { RedirectService } from './redirect.service';

// Repositories
import {
  DomainVisitRepository,
  RedirectRepository,
} from '../../database/repositories';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Redirect.name, schema: RedirectSchema },
      { name: DomainVisit.name, schema: DomainVisitSchema },
    ]),
    ApplicationConfigModule,
  ],
  providers: [RedirectService, RedirectRepository, DomainVisitRepository],
  controllers: [RedirectController],
})
export class RedirectModule {}
