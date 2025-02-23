import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAdornoDto {
  idAdorno: number;
  
  @IsNotEmpty({ message: 'El campo descripción no puede estar vacío' })
  @IsString({
    message: 'El campo descripción solo puede ser una cadena de texto',
  })
  @MaxLength(250, { message: 'Máximo 250 caracteres' })
  descripcion: string;

  @IsNotEmpty({ message: 'El campo nombre no puede estar vacío' })
  @IsString({ message: 'El campo nombre solo puede ser una cadena de texto' })
  @MaxLength(50, { message: 'Máximo 50 caracteres' })
  nombre: string;

  @IsBoolean({ message: 'El campo estado debe ser booleano' })
  estado: boolean;

  @IsNotEmpty({ message: 'El campo dimensiones no puede estar vacío' })
  @IsString({
    message: 'El campo dimensiones solo puede ser una cadena de texto',
  })
  @MaxLength(75, { message: 'Máximo 75 caracteres' })
  dimensiones: string;

  @IsNotEmpty({ message: 'El campo precio unitario no puede estar vacío' })
  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false })
  precioUnitario: number;

  @IsNotEmpty({ message: 'El campo cantidad no puede estar vacío' })
  @IsNumber({ maxDecimalPlaces: 0, allowNaN: false })
  cantidad: number;

  tipoAdorno;

  adornoColor;
}
