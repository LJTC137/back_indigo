import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { TipoUsuarioEntity } from 'src/tipo_usuario/tipo_usuario.entity';
import { TipoUsuarioModule } from 'src/tipo_usuario/tipo_usuario.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity, TipoUsuarioEntity]),
    TipoUsuarioModule,
  ],
  providers: [UsuarioService],
  controllers: [UsuarioController],
  exports: [UsuarioService],
})
export class UsuarioModule {}
