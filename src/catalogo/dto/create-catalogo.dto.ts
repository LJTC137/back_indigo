import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCatalogoDto {
  idCatalogo: number;
  @IsNotEmpty({ message: 'El campo nombre de catalogo no puede estar vacío' })
  @MaxLength(70, {
    message:
      'El campo nombre de catalogo debe tiene un máximo de 70 caracteres',
  })
  @IsString({
    message: 'El campo nombre de catalogo debe ser una cadena de texto',
  })
  nombreCatalogo: string;

  @IsNotEmpty({ message: 'El campo valor de catalogo no puede estar vacío' })
  @MaxLength(70, {
    message: 'El campo valor de catalogo tiene un máximo de 70 caracteres',
  })
  @IsString({
    message: 'El campo valor de catalogo debe ser una cadena de texto',
  })
  valorCatalogo: string;

  estado: boolean;
}
