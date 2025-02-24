import { Module } from '@nestjs/common';
import { AdornoXAlquilerService } from './adorno_x_alquiler.service';
import { AdornoXAlquilerController } from './adorno_x_alquiler.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdornoEntity } from 'src/adorno/adorno.entity';
import { AdornoXAlquilerEntity } from './adorno_x_alquiler.entity';
import { ReservaEntity } from 'src/alquiler/alquiler.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AdornoEntity,
      AdornoXAlquilerEntity,
      ReservaEntity,
    ]),
  ],
  providers: [AdornoXAlquilerService],
  controllers: [AdornoXAlquilerController],
})
export class AdornoXAlquilerModule {}
