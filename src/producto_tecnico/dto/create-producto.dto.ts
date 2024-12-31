import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductoTecnicoDto {
  @IsNotEmpty({ message: 'El campo nombre no puede estar vacío' })
  @IsString({ message: 'El campo nombre debe ser una cadena de texto' })
  @MaxLength(50, {
    message: 'El campo nombre no puede tener más de 50 caracteres',
  })
  nombre: string;

  @IsNotEmpty({ message: 'El campo descripción no puede estar vacío' })
  @IsString({ message: 'El campo descripción debe ser una cadena de texto' })
  @MaxLength(250, {
    message: 'El campo descripción no puede tener más de 250 caracteres',
  })
  descripcion: string;

  @IsBoolean({
    message: 'El campo esDisponible solo puede ser verdadero o falso',
  })
  esDisponible: boolean;

  @IsBoolean({ message: 'El campo estado solo puede ser verdadero o falso' })
  estado: boolean;

  @IsNotEmpty({ message: 'El campo ubicación no puede estar vacío' })
  @IsString({ message: 'El campo ubicación debe ser una cadena de texto' })
  @MaxLength(75, {
    message: 'El campo ubicación no puede tener más de 75 caracteres',
  })
  ubicacionProducto: string;

  @IsNotEmpty({ message: 'El campo fecha de adquisición no puede estar vacío' })
  fechaAdquisicion: Date;

  @IsNotEmpty({ message: 'El campo capacidad técnica no puede estar vacío' })
  @IsString({
    message: 'El campo capacidad técnica debe ser una cadena de texto',
  })
  @MaxLength(100, {
    message: 'El campo capacidad técnica no puede tener más de 100 caracteres',
  })
  capacidadTecnica: string;

  @IsNotEmpty({ message: 'El producto técnico necesita un estado del equipo registrado' })
  estadoEquipoId;
  
  @IsNotEmpty({ message: 'El producto técnico necesita un tipo de producto técnico registrado' })
  tipoProductoId;
}
