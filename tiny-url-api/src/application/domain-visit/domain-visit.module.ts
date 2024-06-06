import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Schemas
import { DomainVisit, DomainVisitSchema } from '../../database/schemas';

//Modules
import { ApplicationConfigModule } from '../../infrastructure/config/config.module';

// Controllers
import { DomainVisitController } from './domain-visit.controller';

// Services
import { DomainVisitService } from './domain-visit.service';

// Repositories
import { DomainVisitRepository } from '../../database/repositories';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DomainVisit.name, schema: DomainVisitSchema },
    ]),
    ApplicationConfigModule,
  ],
  providers: [DomainVisitService, DomainVisitRepository],
  controllers: [DomainVisitController],
})
export class DomainVisitModule {}
