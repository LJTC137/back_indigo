import { IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class CreateReservaDto {
  // idReserva se genera automáticamente, por lo que es opcional
  idReserva?: number;

  @IsNotEmpty({ message: 'El nombre del cliente es obligatorio' })
  nombreClienteReserva: string;

  @IsNotEmpty({ message: 'La identificación del cliente es obligatoria' })
  identificacionClienteReserva: string;

  @IsNotEmpty({ message: 'El teléfono del cliente es obligatorio' })
  telefonoClienteReserva: string;

  @IsNotEmpty({ message: 'La fecha de inicio del evento es obligatoria' })
  fechaInicioEvento: Date;

  @IsNotEmpty({ message: 'La fecha de fin del evento es obligatoria' })
  fechaFinEvento: Date;

  @IsNotEmpty({ message: 'La cantidad de personas es obligatoria' })
  @IsNumber({}, { message: 'La cantidad de personas debe ser un número' })
  cantidadPersonas: number;

  @IsNotEmpty({ message: 'La hora de inicio es obligatoria' })
  horaInicio: string;

  @IsNotEmpty({ message: 'La hora de fin es obligatoria' })
  horaFin: string;

  // fechaRegistro se asigna por defecto
  fechaRegistro?: Date;

  @IsNumber({}, { message: 'La cantidad de sillas debe ser un número' })
  cantidadSillas: number;

  @IsNumber({}, { message: 'La cantidad de mesas debe ser un número' })
  cantidadMesas: number;

  @IsNumber({}, { message: 'La cantidad de mesas y sillas debe ser un número' })
  cantidadPack: number;

  @IsNotEmpty({ message: 'El costo del montaje es obligatorio' })
  @IsNumber({}, { message: 'El costo del montaje debe ser un número' })
  costoMontaje: number;

  @IsNotEmpty({ message: 'El costo de adornos es obligatorio' })
  @IsNumber({}, { message: 'El costo de adornos debe ser un número' })
  costoAdornos: number;

  @IsNotEmpty({ message: 'El costo del servicio es obligatorio' })
  @IsNumber({}, { message: 'El costo del servicio debe ser un número' })
  costoServicio: number;

  @IsNotEmpty({ message: 'El costo total es obligatorio' })
  @IsNumber({}, { message: 'El costo total debe ser un número' })
  costoTotal: number;

  @IsNotEmpty({ message: 'El estado es obligatorio' })
  @IsBoolean({ message: 'El estado debe ser un valor booleano' })
  estado: boolean;

  @IsNotEmpty({ message: 'La reserva necesita un asesor registrado' })
  asesor: any; // Aquí puedes especificar el tipo correspondiente (por ejemplo, AsesorEntity o un id)

  @IsNotEmpty({ message: 'La reserva necesita un estado registrado' })
  estadoReserva: any; // Similar, el tipo que corresponda

  @IsNotEmpty({ message: 'La reserva necesita un tipo de evento registrado' })
  tipoEvento: any;

  @IsNotEmpty({ message: 'La reserva necesita un local registrado' })
  local: any;

  @IsNotEmpty({ message: 'El montaje es obligatorio' })
  montaje: any;

  // Estos campos son relaciones ManyToMany y se pueden enviar como arreglo de identificadores o de objetos
  reservaCatering: any[];
  reservaProducto: any[];
}
