import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAsesorDto {
  @IsBoolean({ message: 'El campo de disponibilidad solo puede ser un valor de si o no' })
  esDisponible: boolean;

  @IsNotEmpty({ message: 'El campo nombres completos no puede estar vacio' })
  nombreCompleto: string;

  @IsNotEmpty({ message: 'El campo correo no puede estar vacio' })
  @IsEmail({}, { message: 'El correo no es válido' })
  correo: string;

  @IsNotEmpty({ message: 'El campo teléfono no puede estar vacio' })
  @MaxLength(10, { message: 'El campo teléfono tiene un máximo de 10 digitos' })
  @MinLength(7, { message: 'El campo teléfono tiene un mínimo de 7 digitos' })
  telefono: string;

  @IsBoolean({ message: 'El campo estado solo puede ser un valor de si o no' })
  estado: boolean;

  @IsString({
    message: 'El campo descripción solo puede ser una cadena de texto',
  })
  @IsNotEmpty({ message: 'El campo descripción no puede estar vacio' })
  descripcion: string;

  @IsNotEmpty({ message: 'El campo especialidad no puede estar vacio' })
  @IsString({
    message: 'El campo especialidad solo puede ser una cadena de texto',
  })
  especialidad: string;
}
