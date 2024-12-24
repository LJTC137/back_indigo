import {
    IsBoolean,
    IsHexColor,
    IsNotEmpty,
    IsString,
    MaxLength,
  } from 'class-validator';
  
  export class CreateColorDto {
    @IsNotEmpty({ message: 'El campo nombre no puede estar vacío' })
    @IsString({ message: 'El campo nombre debe ser una cadena de texto' })
    @MaxLength(20, { message: 'El campo nombre no puede tener más de 20 caracteres' })
    nombre: string;
  
    @IsNotEmpty({ message: 'El campo hexadecimal no puede estar vacío' })
    @IsHexColor({ message: 'El campo hexadecimal debe ser un color en formato hexadecimal válido' })
    hexadecimal: string;
  
    @IsBoolean({ message: 'El campo estado solo puede ser un valor de verdadero o falso' })
    estado: boolean;
  }
  