import {
    IsBoolean,
    IsNumber,
    IsPositive,
    IsString,
    MaxLength,
  } from 'class-validator';
  
  export class UpdateMontajeDto {
    idMontaje: number;
  
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
  
    @IsNumber({}, { message: 'El campo capacidad máxima debe ser un número' })
    @IsPositive({ message: 'El campo capacidad máxima debe ser un valor positivo' })
    capacidadMaxima?: number;
  
    @IsNumber({}, { message: 'El campo costo de la mesa debe ser un número' })
    @IsPositive({ message: 'El campo costo de la mesa debe ser un valor positivo' })
    costoMesa?: number;
  
    @IsNumber({}, { message: 'El campo costo de la silla debe ser un número' })
    @IsPositive({ message: 'El campo costo de la silla debe ser un valor positivo' })
    costoSilla?: number;
  
    @IsNumber({}, { message: 'El campo costo del paquete debe ser un número' })
    @IsPositive({ message: 'El campo costo del paquete debe ser un valor positivo' })
    costoPack?: number;
  
    @IsNumber({}, { message: 'El campo depósito reembolsable debe ser un número' })
    @IsPositive({ message: 'El campo depósito reembolsable debe ser un valor positivo' })
    depositoReembolsable?: number;
  
    tipoCobroId?;
    tipoMontajeId?;
  }
  