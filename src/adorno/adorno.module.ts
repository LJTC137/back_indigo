import { Module } from '@nestjs/common';
import { AdornoController } from './adorno.controller';
import { AdornoService } from './adorno.service';

@Module({
  controllers: [AdornoController],
  providers: [AdornoService]
})
export class AdornoModule {}
