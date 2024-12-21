import {
  IsString,
  IsEmail,
  MinLength,
  IsBoolean,
  IsNumber,
  MaxLength,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';

export class UpdateUsuarioDto {
  idUsuario: number;

  @IsNotEmpty({ message: 'El campo nombres no puede estar vacío' })
  @IsString({ message: 'El campo nombres debe ser una cadena de texto' })
  nombres?: string;

  @IsNotEmpty({ message: 'El campo identificación no puede estar vacío' })
  @MaxLength(13, { message: 'La identificación tiene un máximo de 13 caracteres' })
  @MinLength(10, { message: 'La identificación tiene un mínimo de 10 caracteres' })
  @IsString({ message: 'El campo identificación debe ser una cadena de texto' })
  identificacion?: string;

  @IsNotEmpty({ message: 'El campo correo no puede estar vacío' })
  @IsEmail({}, { message: 'El formato del correo electrónico no es válido' })
  correo?: string;

  @IsNotEmpty({ message: 'El campo contraseña no puede estar vacío' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  contrasenia?: string;

  @IsBoolean({ message: 'El campo estado debe ser un valor de si o no' })
  estado?: boolean;

  tipo_usuarioId?: number;
}
