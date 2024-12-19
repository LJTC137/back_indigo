import { Module } from '@nestjs/common';
import { EquipoServicioService } from './equipo_servicio.service';
import { EquipoServicioController } from './equipo_servicio.controller';

@Module({
  providers: [EquipoServicioService],
  controllers: [EquipoServicioController]
})
export class EquipoServicioModule {}
