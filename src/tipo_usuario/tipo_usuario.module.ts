import { Module } from '@nestjs/common';
import { TipoUsuarioService } from './tipo_usuario.service';
import { TipoUsuarioController } from './tipo_usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoUsuarioEntity } from './tipo_usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoUsuarioEntity])],
  providers: [TipoUsuarioService],
  controllers: [TipoUsuarioController],
  exports: [TipoUsuarioService],
})
export class TipoUsuarioModule {}
