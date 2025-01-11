import { Module } from '@nestjs/common';
import { AlquilerService } from './alquiler.service';
import { AlquilerController } from './alquiler.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlquilerEntity } from './alquiler.entity';
import { CatalogoEntity } from 'src/catalogo/catalogo.entity';
import { AsesorEntity } from 'src/asesor/asesor.entity';
import { LocalEntity } from 'src/local/local.entity';
import { MontajeEntity } from 'src/montaje/montaje.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AlquilerEntity,
      AsesorEntity,
      CatalogoEntity,
      LocalEntity,
      MontajeEntity,
      UsuarioEntity,
    ]),
  ],
  providers: [AlquilerService],
  controllers: [AlquilerController],
})
export class AlquilerModule {}
