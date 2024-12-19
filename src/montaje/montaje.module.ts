import { Module } from '@nestjs/common';
import { MontajeService } from './montaje.service';
import { MontajeController } from './montaje.controller';

@Module({
  providers: [MontajeService],
  controllers: [MontajeController]
})
export class MontajeModule {}
