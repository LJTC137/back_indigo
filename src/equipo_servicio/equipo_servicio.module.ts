import { Module } from '@nestjs/common';
import { EquipoServicioService } from './equipo_servicio.service';
import { EquipoServicioController } from './equipo_servicio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogoEntity } from 'src/catalogo/catalogo.entity';
import { EquipoServicioEntity } from './equipo_servicio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CatalogoEntity, EquipoServicioEntity])],
  providers: [EquipoServicioService],
  controllers: [EquipoServicioController]
})
export class EquipoServicioModule {}
