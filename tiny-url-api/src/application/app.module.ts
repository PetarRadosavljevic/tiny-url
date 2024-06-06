import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Modules
import { ApplicationConfigModule } from '../infrastructure/config/config.module';
import { RedirectModule } from './redirect/redirect.module';
import { DomainVisitModule } from './domain-visit/domain-visit.module';

// Service
import { ApplicationConfigService } from '../infrastructure/config/config.service';

@Module({
  imports: [
    // Database - Mongo
    MongooseModule.forRootAsync({
      imports: [ApplicationConfigModule],
      useFactory: (configService: ApplicationConfigService) => ({
        uri: configService.getDatabaseConnectionUrl(),
      }),
      inject: [ApplicationConfigService],
    }),
    //Modules
    DomainVisitModule,
    RedirectModule,
    //Config
    ApplicationConfigModule,
  ],
  providers: [],
})
export class AppModule {}
