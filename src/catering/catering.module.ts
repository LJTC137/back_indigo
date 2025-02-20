import { Module } from '@nestjs/common';
import { CateringService } from './catering.service';
import { CateringController } from './catering.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CateringEntity } from './catering.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CateringEntity])],
  providers: [CateringService],
  controllers: [CateringController],
})
export class CateringModule {}
