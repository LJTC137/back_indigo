import { IsNotEmpty } from "class-validator";

export class AlquilerXEquipoDto{
    idAlquilerXEquipo: number;
    alquilerId?;
    equipoId?;

    horaXServicio?: number;
}