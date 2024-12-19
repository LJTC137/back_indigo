import { Module } from '@nestjs/common';
import { CatalogoService } from './catalogo.service';
import { CatalogoController } from './catalogo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogoEntity } from './catalogo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CatalogoEntity])],
  providers: [CatalogoService],
  controllers: [CatalogoController]
})
export class CatalogoModule {}
