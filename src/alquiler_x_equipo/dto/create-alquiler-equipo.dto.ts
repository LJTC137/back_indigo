import { IsNotEmpty } from 'class-validator';

export class CreateAlquilerXEquipoDto {
  idAlquilerXEquipo: number;
  @IsNotEmpty({ message: 'AlquilerXEquipo falta el id alquiler' })
  alquilerId;

  @IsNotEmpty({
    message: 'El alquiler necesita un equipo de servicio registrado',
  })
  equipoId;

  @IsNotEmpty({ message: 'El campo no puede estar vacio' })
  horaXServicio: number;
}
