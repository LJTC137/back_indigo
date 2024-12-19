import { Module } from '@nestjs/common';
import { ProductoTecnicoService } from './producto_tecnico.service';
import { ProductoTecnicoController } from './producto_tecnico.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoTecnicoEntity } from './producto_tecnico.entity';
import { CatalogoEntity } from 'src/catalogo/catalogo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ CatalogoEntity, ProductoTecnicoEntity])],
  providers: [ProductoTecnicoService],
  controllers: [ProductoTecnicoController]
})
export class ProductoTecnicoModule {}
