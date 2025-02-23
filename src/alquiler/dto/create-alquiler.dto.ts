import { IsBoolean, isNotEmpty, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAlquilerDto {
  idAlquiler: number;
  @IsNotEmpty({ message: 'El campo fecha de evento no puede estar vacio' })
  fechaEvento: Date;

  @IsNotEmpty({ message: 'El campo cantidad de personas no puede estar vacio' })
  @IsNumber({ allowNaN: false, maxDecimalPlaces: 0 })
  cantidadPersonas: number;

  @IsNotEmpty({ message: 'El campo hora de inicio no puede estar vacio' })
  horaInicio: string;

  @IsNotEmpty({ message: 'El campo hora de finalización no puede estar vacio' })
  horaFin: string;

  fechaRegistro: Date;

  @IsNotEmpty({ message: 'El campo cantidad de sillas no puede estar vacio' })
  @IsNumber({ allowNaN: false, maxDecimalPlaces: 0 })
  cantidadSillas: number;

  @IsNotEmpty({ message: 'El campo cantidad de mesas no puede estar vacio' })
  @IsNumber({ allowNaN: false, maxDecimalPlaces: 0 })
  cantidadMesas: number;

  @IsNotEmpty({
    message: 'El campo costo del equipo de servicio no puede estar vacio',
  })
  @IsNumber({ allowNaN: false, maxDecimalPlaces: 0 })
  costoServicio: number;

  @IsNotEmpty({ message: 'El campo cantidad de mesas no puede estar vacio' })
  @IsNumber({ allowNaN: false, maxDecimalPlaces: 0 })
  costoTotal: number;

  @IsBoolean({ message: 'El campo estado solo puede ser un valor de si o no' })
  estado: boolean;

  @IsNotEmpty({ message: 'El alquiler necesita un asesor registrado' })
  asesorId;

  @IsNotEmpty({
    message: 'El alquiler necesita un estado de alquiler registrado',
  })
  estadoAlquilerId;

  @IsNotEmpty({ message: 'El alquiler necesita un tipo de evento registrado' })
  tipoEventoId;

  @IsNotEmpty({ message: 'El alquiler necesita un local registrado' })
  localId;

  @IsNotEmpty({ message: 'El alquiler necesita un tipo de montaje registrado' })
  montajeId;

  @IsNotEmpty({
    message: 'El alquiler necesita el id del usuario conectado registrado',
  })
  usuarioId;
}
