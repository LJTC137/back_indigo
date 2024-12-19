import { Module } from '@nestjs/common';
import { AsesorController } from './asesor.controller';
import { AsesorService } from './asesor.service';

@Module({
  controllers: [AsesorController],
  providers: [AsesorService]
})
export class AsesorModule {}
