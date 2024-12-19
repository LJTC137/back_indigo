import { Module } from '@nestjs/common';
import { ProductoTecnicoService } from './producto_tecnico.service';
import { ProductoTecnicoController } from './producto_tecnico.controller';

@Module({
  providers: [ProductoTecnicoService],
  controllers: [ProductoTecnicoController]
})
export class ProductoTecnicoModule {}
