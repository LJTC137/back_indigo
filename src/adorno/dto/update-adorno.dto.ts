import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateAdornoDto {
  idAdorno: number;

  @IsString({
    message: 'El campo descripción solo puede ser una cadena de texto',
  })
  @MaxLength(250, {
    message: 'El campo descripción tiene un máximo de 250 caracteres',
  })
  descripcion?: string;

  @IsString({ message: 'El campo nombre solo puede ser una cadena de texto' })
  @MaxLength(50, {
    message: 'El campo nombre tiene un máximo de 250 caracteres',
  })
  nombre?: string;

  @IsBoolean({ message: 'El campo estado solo puede ser un valor de si o no' })
  estado?: boolean;

  @IsString({
    message: 'El campo dimensiones solo puede ser una cadena de texto',
  })
  @MaxLength(50, {
    message: 'El campo nombre tiene un máximo de 75 caracteres',
  })
  dimensiones?: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false })
  precioUnitario?: number;

  @IsNumber({ maxDecimalPlaces: 0, allowNaN: false })
  cantidad?: number;

  tipoAdorno?;
}
