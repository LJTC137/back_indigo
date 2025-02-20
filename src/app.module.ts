import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from './config/constants';
import { UsuarioModule } from './usuario/usuario.module';
import { TipoUsuarioModule } from './tipo_usuario/tipo_usuario.module';
import { CatalogoModule } from './catalogo/catalogo.module';
import { EquipoServicioModule } from './equipo_servicio/equipo_servicio.module';
import { MontajeModule } from './montaje/montaje.module';
import { CateringModule } from './catering/catering.module';
import { AsesorModule } from './asesor/asesor.module';
import { LocalModule } from './local/local.module';
import { AdornoModule } from './adorno/adorno.module';
import { ProductoTecnicoModule } from './producto_tecnico/producto_tecnico.module';
import { ImagesModule } from './images/images.module';
import { AlquilerModule } from './alquiler/alquiler.module';
import { ColorModule } from './color/color.module';
import { AlquilerXEquipoModule } from './alquiler_x_equipo/alquiler_x_equipo.module';
import { AuthModule } from './auth/auth.module';
import { AdornoXAlquilerModule } from './adorno_x_alquiler/adorno_x_alquiler.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>(DB_HOST),
        port: configService.get<number>(DB_PORT),
        username: configService.get<string>(DB_USER),
        password: configService.get<string>(DB_PASSWORD),
        database: configService.get<string>(DB_DATABASE),
        entities: ['dist/**/*.entity{.ts,.js}'],
        autoLoadEntities: false,
        synchronize: true,
        dropSchema: false,
        retryDelay: 3000,
        retryAttempts: 10,
      }),
      inject: [ConfigService],
    }),
    AdornoModule,
    AdornoXAlquilerModule,
    AlquilerModule,
    AlquilerXEquipoModule,
    AsesorModule,
    CatalogoModule,
    CateringModule,
    ColorModule,
    EquipoServicioModule,
    ImagesModule,
    LocalModule,
    MontajeModule,
    ProductoTecnicoModule,
    TipoUsuarioModule,
    UsuarioModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
