import { Module } from '@nestjs/common';
import { AlquilerService } from './alquiler.service';
import { AlquilerController } from './alquiler.controller';

@Module({
  providers: [AlquilerService],
  controllers: [AlquilerController]
})
export class AlquilerModule {}
