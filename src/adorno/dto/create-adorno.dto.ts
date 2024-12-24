import { IsBoolean, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateAdornoDto {
  @IsNotEmpty({ message: 'El campo descripción no puede estar vacio' })
  @IsString({ message: 'El campo descripción solo puede ser una cadena de texto' })
  @MaxLength(250, { message: 'El campo descripción tiene un máximo de 250 caracteres' })
  descripcion: string;

  @IsNotEmpty({ message: 'El campo nombre no puede estar vacio' })
  @IsString({ message: 'El campo nombre solo puede ser una cadena de texto' })
  @MaxLength(50, { message: 'El campo nombre tiene un máximo de 250 caracteres' })
  nombre: string;

  @IsBoolean({ message: 'El campo estado solo puede ser un valor de si o no' })
  estado: boolean;

  @IsNotEmpty({ message: 'El campo dimensiones no puede estar vacio' })
  @IsString({ message: 'El campo dimensiones solo puede ser una cadena de texto' })
  @MaxLength(50, { message: 'El campo nombre tiene un máximo de 75 caracteres' })
  dimensiones: string;

  @IsNotEmpty({ message: 'El campo precio unitario no puede estar vacio' })
  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false })
  precioUnitario: number;

  @IsNotEmpty({ message: 'El campo cantidad no puede estar vacio' })
  @IsNumber({ maxDecimalPlaces: 0, allowNaN: false })
  cantidad: number;

  tipoAdornoId;
  adornoColorIds;
}
