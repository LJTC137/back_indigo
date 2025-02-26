import {
    IsBoolean,
    IsNumber,
    IsPositive,
    IsString,
    MaxLength,
  } from 'class-validator';
  
  export class UpdateEquipoServicioDto {
    idEquipo: number;
  
    @IsString({ message: 'El campo descripción debe ser una cadena de texto' })
    @MaxLength(250, { message: 'El campo descripción no puede tener más de 250 caracteres' })
    descripcion?: string;
  
    @IsNumber({}, { message: 'El campo tarifa por evento debe ser un número' })
    @IsPositive({ message: 'El campo tarifa por evento debe ser un valor positivo' })
    tarifaXEvento?: number;
  
    @IsNumber({}, { message: 'El campo cantidad de personas debe ser un número' })
    @IsPositive({ message: 'El campo cantidad de personas debe ser un valor positivo' })
    cantidadPersonas?: number;
  
    @IsBoolean({ message: 'El campo estado solo puede ser un valor de verdadero o falso' })
    estado?: boolean;
  
    @IsNumber({}, { message: 'El campo precio por hora debe ser un número' })
    @IsPositive({ message: 'El campo precio por hora debe ser un valor positivo' })
    precioXHora?: number;
  
    @IsBoolean({ message: 'El campo disponibilidad solo puede ser un valor de verdadero o falso' })
    esDisponible?: boolean;
  
    tipoContratacion;
    tipoEquipo;
}
  