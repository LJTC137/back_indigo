import { IsNumber, IsString, MaxLength } from "class-validator";

export class UpdateAdornoXAlquilerDto{
    idAdornoXAlquiler: number;

    adorno?;

    reserva?;

    @IsString({ message: 'El campo de color solo puede ser una cadena de texto' })
    @MaxLength(20 ,{ message: 'El campo color tiene como máximo 20 caracteres' })
    color?: string;

    @IsNumber({ allowNaN: false, maxDecimalPlaces: 0 })
    cantidadAdornos: number;
}