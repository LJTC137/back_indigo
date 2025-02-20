import { Module } from '@nestjs/common';
import { AdornoController } from './adorno.controller';
import { AdornoService } from './adorno.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdornoEntity } from './adorno.entity';
import { CatalogoEntity } from 'src/catalogo/catalogo.entity';
import { ColorEntity } from 'src/color/color.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdornoEntity, CatalogoEntity, ColorEntity]),
  ],
  controllers: [AdornoController],
  providers: [AdornoService],
})
export class AdornoModule {}
