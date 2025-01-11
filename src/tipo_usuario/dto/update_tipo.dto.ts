import { IsEnum } from 'class-validator';
import { TipoEnum } from '../tipo_usuario.enum';

export class UpdateTipoUsuarioDto {
  @IsEnum(TipoEnum, {
    message: 'El tipo usuario solo puede ser usuario o admin',
  })
  nombre_tipo_usuario?: string;
}
