import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateAsesorDto {
  idAsesor: number;
  @IsBoolean({
    message: 'El campo de disponibilidad solo puede ser un valor de si o no',
  })
  esDisponible: boolean;

  @IsString({
    message: 'El campo del nombre completo solo puede ser una cadena de texto',
  })
  nombreCompleto: string;

  @IsEmail({}, { message: 'El correo no es válido' })
  correo: string;

  @MaxLength(10, { message: 'El campo teléfono tiene un máximo de 10 digitos' })
  @MinLength(7, { message: 'El campo teléfono tiene un mínimo de 7 digitos' })
  telefono: string;

  @IsBoolean({ message: 'El campo estado solo puede ser un valor de si o no' })
  estado: boolean;

  @IsString({
    message: 'El campo descripción solo puede ser una cadena de texto',
  })
  descripcion: string;

  @IsString({
    message: 'El campo especialidad solo puede ser una cadena de texto',
  })
  especialidad: string;
}
