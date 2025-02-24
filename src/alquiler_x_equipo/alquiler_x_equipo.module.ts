import { Module } from '@nestjs/common';
import { AlquilerXEquipoService } from './alquiler_x_equipo.service';
import { AlquilerXEquipoController } from './alquiler_x_equipo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaEntity } from 'src/alquiler/alquiler.entity';
import { EquipoServicioEntity } from 'src/equipo_servicio/equipo_servicio.entity';
import { AlquilerXEquipoEntity } from './alquiler_x_equipo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReservaEntity,
      AlquilerXEquipoEntity,
      EquipoServicioEntity,
    ]),
  ],
  providers: [AlquilerXEquipoService],
  controllers: [AlquilerXEquipoController],
})
export class AlquilerXEquipoModule {}
