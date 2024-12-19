import { Module } from '@nestjs/common';
import { CateringService } from './catering.service';
import { CateringController } from './catering.controller';

@Module({
  providers: [CateringService],
  controllers: [CateringController]
})
export class CateringModule {}
