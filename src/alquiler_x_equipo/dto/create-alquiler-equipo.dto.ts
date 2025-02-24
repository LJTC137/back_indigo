import { IsNotEmpty } from 'class-validator';

export class CreateAlquilerXEquipoDto {
  idReservaXEquipo: number;
  @IsNotEmpty({ message: 'AlquilerXEquipo falta el id alquiler' })
  reserva;

  @IsNotEmpty({
    message: 'El alquiler necesita un equipo de servicio registrado',
  })
  equipo;

  @IsNotEmpty({ message: 'El campo no puede estar vacio' })
  horaXServicio: number;
}
