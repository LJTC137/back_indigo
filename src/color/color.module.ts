import { Module } from '@nestjs/common';
import { ColorController } from './color.controller';
import { ColorService } from './color.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorEntity } from './color.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ColorEntity])],
  controllers: [ColorController],
  providers: [ColorService]
})
export class ColorModule {}
