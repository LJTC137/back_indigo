import { Module } from '@nestjs/common';
import { AsesorController } from './asesor.controller';
import { AsesorService } from './asesor.service';
import { AsesorEntity } from './asesor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AsesorEntity])],
  controllers: [AsesorController],
  providers: [AsesorService],
})
export class AsesorModule {}
