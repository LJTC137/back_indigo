import { Module } from '@nestjs/common';
import { MontajeService } from './montaje.service';
import { MontajeController } from './montaje.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MontajeEntity } from './montaje.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MontajeEntity])],
  providers: [MontajeService],
  controllers: [MontajeController],
})
export class MontajeModule {}
