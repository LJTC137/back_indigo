import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    MaxLength,
  } from 'class-validator';
  
  export class CreateMontajeDto {
    @IsNotEmpty({ message: 'El campo nombre no puede estar vacío' })
    @IsString({ message: 'El campo nombre debe ser una cadena de texto' })
    @MaxLength(50, { message: 'El campo nombre no puede tener más de 50 caracteres' })
    nombre: string;
  
    @IsNotEmpty({ message: 'El campo descripción no puede estar vacío' })
    @IsString({ message: 'El campo descripción debe ser una cadena de texto' })
    @MaxLength(250, { message: 'El campo descripción no puede tener más de 250 caracteres' })
    descripcion: string;
  
    @IsBoolean({ message: 'El campo esDisponible solo puede ser verdadero o falso' })
    esDisponible: boolean;
  
    @IsBoolean({ message: 'El campo estado solo puede ser verdadero o falso' })
    estado: boolean;
  
    @IsNotEmpty({ message: 'El campo capacidad máxima no puede estar vacío' })
    @IsNumber({}, { message: 'El campo capacidad máxima debe ser un número' })
    @IsPositive({ message: 'El campo capacidad máxima debe ser un valor positivo' })
    capacidadMaxima: number;
  
    @IsNotEmpty({ message: 'El campo costo de la mesa no puede estar vacío' })
    @IsNumber({}, { message: 'El campo costo de la mesa debe ser un número' })
    @IsPositive({ message: 'El campo costo de la mesa debe ser un valor positivo' })
    costoMesa: number;
  
    @IsNotEmpty({ message: 'El campo costo de la silla no puede estar vacío' })
    @IsNumber({}, { message: 'El campo costo de la silla debe ser un número' })
    @IsPositive({ message: 'El campo costo de la silla debe ser un valor positivo' })
    costoSilla: number;
  
    @IsNotEmpty({ message: 'El campo costo del paquete no puede estar vacío' })
    @IsNumber({}, { message: 'El campo costo del paquete debe ser un número' })
    @IsPositive({ message: 'El campo costo del paquete debe ser un valor positivo' })
    costoPack: number;
  
    @IsNotEmpty({ message: 'El campo depósito reembolsable no puede estar vacío' })
    @IsNumber({}, { message: 'El campo depósito reembolsable debe ser un número' })
    @IsPositive({ message: 'El campo depósito reembolsable debe ser un valor positivo' })
    depositoReembolsable: number;

    tipoCobroId;
    tipoMontajeId;
}
  