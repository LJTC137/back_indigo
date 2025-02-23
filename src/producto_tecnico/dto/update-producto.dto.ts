import {
    IsBoolean,
    IsString,
    MaxLength,
  } from 'class-validator';
  
  export class UpdateProductoTecnicoDto {
    idProducto: number;
  
    @IsString({ message: 'El campo nombre debe ser una cadena de texto' })
    @MaxLength(50, { message: 'El campo nombre no puede tener más de 50 caracteres' })
    nombre?: string;
  
    @IsString({ message: 'El campo descripción debe ser una cadena de texto' })
    @MaxLength(250, { message: 'El campo descripción no puede tener más de 250 caracteres' })
    descripcion?: string;
  
    @IsBoolean({ message: 'El campo esDisponible solo puede ser verdadero o falso' })
    esDisponible?: boolean;
  
    @IsBoolean({ message: 'El campo estado solo puede ser verdadero o falso' })
    estado?: boolean;
  
    @IsString({ message: 'El campo ubicación debe ser una cadena de texto' })
    @MaxLength(75, { message: 'El campo ubicación no puede tener más de 75 caracteres' })
    ubicacionProducto?: string;
  
    fechaAdquisicion?: Date;
  
    @IsString({ message: 'El campo capacidad técnica debe ser una cadena de texto' })
    @MaxLength(100, { message: 'El campo capacidad técnica no puede tener más de 100 caracteres' })
    capacidadTecnica?: string;
  
    estadoEquipo?;
    tipoProducto?;
  }
  