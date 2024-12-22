import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateAdornoXAlquilerDto {
    adorno;

    alquiler;

    @IsNotEmpty({ message: 'El campo color no puede estar vacio' })
    @IsString({ message: 'El campo de color solo puede ser una cadena de texto' })
    @MaxLength(20, { message: 'El campo color tiene como máximo 20 caracteres' })
    color: string;

    @IsNotEmpty({ message: 'El campo cantidad de adornos no puede estar vacio' })
    @IsNumber({ allowNaN: false, maxDecimalPlaces: 0 })
    cantidadAdornos: number;
}