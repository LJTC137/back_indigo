import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCatalogoDto {
  idCatalogo: number;

  @IsNotEmpty({ message: 'El campo nombre de catalogo no puede estar vacío' })
  @MaxLength(13, { message: 'El campo nombre de catalogo debe tiene un máximo de 70 caracteres' })
  @IsString({
    message: 'El campo nombre de catalogo debe ser una cadena de texto',
  })
  nombreCatalogo?: string;

  @IsNotEmpty({ message: 'El campo valor de catalogo no puede estar vacío' })
  @MaxLength(13, { message: 'El campo valor de catalogo debe tiene un máximo de 70 caracteres' })
  @IsString({
    message: 'El campo valor de catalogo debe ser una cadena de texto',
  })
  valorCatalogo?: string;

  @IsBoolean({
    message: 'El campo estado debe ser un valor de si o no',
  })
  estado: boolean;
}
