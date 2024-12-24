import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    MaxLength,
  } from 'class-validator';
  
  export class UpdateLocalDto {
    idLocal: number;
  
    @IsString({ message: 'El campo dirección debe ser una cadena de texto' })
    @MaxLength(50, { message: 'El campo dirección no puede tener más de 50 caracteres' })
    direccion?: string;
  
    @IsString({ message: 'El campo sector debe ser una cadena de texto' })
    @MaxLength(20, { message: 'El campo sector no puede tener más de 20 caracteres' })
    sector?: string;
  
    @IsString({ message: 'El campo nombre del local debe ser una cadena de texto' })
    @MaxLength(20, { message: 'El campo nombre del local no puede tener más de 20 caracteres' })
    nombreLocal?: string;
  
    @IsString({ message: 'El campo descripción debe ser una cadena de texto' })
    @MaxLength(250, { message: 'El campo descripción no puede tener más de 250 caracteres' })
    descripcion?: string;
  
    @IsString({ message: 'El campo dimensiones debe ser una cadena de texto' })
    @MaxLength(10, { message: 'El campo dimensiones no puede tener más de 10 caracteres' })
    dimensiones?: string;
  
    @IsBoolean({ message: 'El campo estado solo puede ser un valor de verdadero o falso' })
    estado?: boolean;
  
    @IsNumber({}, { message: 'El campo tarifa por hora debe ser un número' })
    @IsPositive({ message: 'El campo tarifa por hora debe ser un valor positivo' })
    tarifaXHora?: number;
  
    @IsNumber({}, { message: 'El campo tarifa por día debe ser un número' })
    @IsPositive({ message: 'El campo tarifa por día debe ser un valor positivo' })
    tarifaXDia?: number;
  
    @IsNumber({}, { message: 'El campo aforo debe ser un número' })
    @IsPositive({ message: 'El campo aforo debe ser un valor positivo' })
    aforo?: number;
  
    estadoDisponibilidadId?;
    tipoLocalId?;
  }
  