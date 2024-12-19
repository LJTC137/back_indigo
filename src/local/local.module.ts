import { Module } from '@nestjs/common';
import { LocalService } from './local.service';
import { LocalController } from './local.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogoEntity } from 'src/catalogo/catalogo.entity';
import { LocalEntity } from './local.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CatalogoEntity, LocalEntity])],
  providers: [LocalService],
  controllers: [LocalController]
})
export class LocalModule { }
