import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    MaxLength,
  } from 'class-validator';
  
  export class CreateEquipoServicioDto {
    idEquipo: number;
    @IsNotEmpty({ message: 'El campo descripción no puede estar vacío' })
    @IsString({ message: 'El campo descripción debe ser una cadena de texto' })
    @MaxLength(250, { message: 'El campo descripción no puede tener más de 250 caracteres' })
    descripcion: string;
  
    @IsNotEmpty({ message: 'El campo tarifa por evento no puede estar vacío' })
    @IsNumber({}, { message: 'El campo tarifa por evento debe ser un número' })
    @IsPositive({ message: 'El campo tarifa por evento debe ser un valor positivo' })
    tarifaXEvento: number;
  
    @IsNotEmpty({ message: 'El campo cantidad de personas no puede estar vacío' })
    @IsNumber({}, { message: 'El campo cantidad de personas debe ser un número' })
    @IsPositive({ message: 'El campo cantidad de personas debe ser un valor positivo' })
    cantidadPersonas: number;
  
    @IsBoolean({ message: 'El campo estado solo puede ser un valor de verdadero o falso' })
    estado: boolean;
  
    @IsNotEmpty({ message: 'El campo precio por hora no puede estar vacío' })
    @IsNumber({}, { message: 'El campo precio por hora debe ser un número' })
    @IsPositive({ message: 'El campo precio por hora debe ser un valor positivo' })
    precioXHora: number;
  
    @IsBoolean({ message: 'El campo disponibilidad solo puede ser un valor de verdadero o falso' })
    esDisponible: boolean;

    @IsNotEmpty({ message: 'El equipo de servicio necesita un tipo de contratación registrado' })
    tipoContratacion;

    @IsNotEmpty({ message: 'El equipo de servicio necesita un tipo de equipo de servicio registrado' })
    tipoEquipo;
  }
  