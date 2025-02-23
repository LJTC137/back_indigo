import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    MaxLength,
  } from 'class-validator';
  
  export class UpdateCateringDto {
    idCatering: number;
  
    @IsString({ message: 'El campo nombre del servicio debe ser una cadena de texto' })
    @MaxLength(50, { message: 'El campo nombre del servicio no puede tener más de 50 caracteres' })
    nombreServicio?: string;
  
    @IsString({ message: 'El campo descripción debe ser una cadena de texto' })
    @MaxLength(250, { message: 'El campo descripción no puede tener más de 250 caracteres' })
    descripcion?: string;
  
    @IsNumber({}, { message: 'El campo precio por persona debe ser un número' })
    @IsPositive({ message: 'El campo precio por persona debe ser un valor positivo' })
    precioXPersona?: number;
  
    @IsBoolean({ message: 'El campo estado solo puede ser un valor de verdadero o falso' })
    estado?: boolean;
  
    tipoCatering?;
  }
  