import { IsNotEmpty } from "class-validator";

export class AlquilerXEquipoDto{
    alquilerId;
    equipoId;

    @IsNotEmpty({ message: 'El campo no puede estar vacio' })
    horaXServicio: number;
}