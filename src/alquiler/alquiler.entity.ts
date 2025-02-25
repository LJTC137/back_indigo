import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { AsesorEntity } from 'src/asesor/asesor.entity';
import { CatalogoEntity } from 'src/catalogo/catalogo.entity';
import { CateringEntity } from 'src/catering/catering.entity';
import { LocalEntity } from 'src/local/local.entity';
import { MontajeEntity } from 'src/montaje/montaje.entity';
import { ProductoTecnicoEntity } from 'src/producto_tecnico/producto_tecnico.entity';
import { AlquilerXEquipoEntity } from 'src/alquiler_x_equipo/alquiler_x_equipo.entity';
import { AdornoXAlquilerEntity } from 'src/adorno_x_alquiler/adorno_x_alquiler.entity';

@Entity({
  name: 'reserva',
  comment: 'Tabla que almacena las reservas de eventos en el local.',
})
export class ReservaEntity {
  @PrimaryGeneratedColumn({
    comment: 'Primary key tipo serial para la reserva.',
  })
  idReserva: number;

  @Column({
    nullable: false,
    type: 'varchar',
    comment: 'Nombre del cliente que realiza la reserva.',
  })
  nombreClienteReserva: string;

  @Column({
    nullable: false,
    type: 'varchar',
    comment: 'Número de identificación del cliente que realiza la reserva.',
  })
  identificacionClienteReserva: string;

  @Column({
    nullable: false,
    type: 'varchar',
    comment: 'Número de teléfono del cliente que realiza la reserva.',
  })
  telefonoClienteReserva: string;

  @Column({
    nullable: false,
    type: 'integer',
    comment: 'Cantidad de personas que asistirán al evento.',
  })
  cantidadPersonas: number;

  @Column({
    nullable: false,
    type: 'time',
    comment: 'Hora de inicio del evento.',
  })
  horaInicio: string;

  @Column({
    nullable: false,
    type: 'time',
    comment: 'Hora de finalización del evento.',
  })
  horaFin: string;

  @Column({
    nullable: false,
    type: 'date',
    comment: 'Fecha de inicio del evento.',
  })
  fechaInicioEvento: Date;

  @Column({
    nullable: false,
    type: 'date',
    comment: 'Fecha de finalización del evento.',
  })
  fechaFinEvento: Date;

  // Relación con asesor
  //comment: 'Referencia al asesor encargado de la reserva.',
  @ManyToOne(() => AsesorEntity, {
    nullable: false,
  })
  @JoinColumn({ name: 'idAsesor' })
  asesor: AsesorEntity;

  // Relación con catálogo para tipo de evento
  //comment: 'Tipo de evento asociado a la reserva.',
  @ManyToOne(() => CatalogoEntity, {
    nullable: false,
  })
  @JoinColumn({ name: 'tipoEvento' })
  tipoEvento: CatalogoEntity;

  // Relación con catálogo para estado de reserva
  //comment:'Estado actual de la reserva (pendiente, confirmada, cancelada, etc.).',
  @ManyToOne(() => CatalogoEntity, {
    nullable: false,
  })
  @JoinColumn({ name: 'estadoReserva' })
  estadoReserva: CatalogoEntity;

  // Relación ManyToMany con catering
  //comment: 'Listado de servicios de catering asociados a la reserva.',
  @ManyToMany(() => CateringEntity, {
    eager: true,
  })
  @JoinTable({
    name: 'reserva_catering',
    joinColumn: { name: 'idReserva' },
    inverseJoinColumn: { name: 'idCatering' },
  })
  reservaCatering: CateringEntity[];

  // Relación con local
  //comment: 'Referencia al local donde se realizará el evento.',
  @ManyToOne(() => LocalEntity, {
    nullable: false,
  })
  @JoinColumn({ name: 'idLocal' })
  local: LocalEntity;

  // Relación con montaje
  //comment: 'Tipo de montaje seleccionado para el evento.',
  @ManyToOne(() => MontajeEntity, {
    nullable: false,
  })
  @JoinColumn({ name: 'idMontaje' })
  montaje: MontajeEntity;

  // Relación ManyToMany con producto tecnológico
  //comment: 'Listado de productos tecnológicos contratados para la reserva.',
  @ManyToMany(() => ProductoTecnicoEntity, {
    eager: true,
  })
  @JoinTable({
    name: 'reserva_producto',
    joinColumn: { name: 'idReserva' },
    inverseJoinColumn: { name: 'idProducto' },
  })
  reservaProducto: ProductoTecnicoEntity[];

  @Column({
    nullable: false,
    type: 'date',
    default: () => 'CURRENT_DATE',
    comment: 'Fecha en la que se registró la reserva.',
  })
  fechaRegistro: Date;

  @Column({
    nullable: false,
    type: 'integer',
    comment: 'Cantidad de sillas solicitadas para el evento.',
  })
  cantidadSillas: number;

  @Column({
    nullable: false,
    type: 'integer',
    comment: 'Cantidad de mesas solicitadas para el evento.',
  })
  cantidadMesas: number;

  @Column({
    nullable: false,
    type: 'integer',
    comment: 'Cantidad de paquetes de decoración contratados.',
  })
  cantidadPack: number;

  @Column({
    nullable: false,
    type: 'double precision',
    comment: 'Costo del montaje del evento.',
  })
  costoMontaje: number;

  @Column({
    nullable: false,
    type: 'double precision',
    comment: 'Costo de los adornos incluidos en la reserva.',
  })
  costoAdornos: number;

  @Column({
    nullable: false,
    type: 'double precision',
    comment: 'Costo del servicio de atención y logística.',
  })
  costoServicio: number;

  @Column({
    nullable: false,
    type: 'double precision',
    comment: 'Costo total de la reserva.',
  })
  costoTotal: number;

  @Column({
    nullable: false,
    type: 'boolean',
    default: true,
    comment: 'Indica si la reserva está activa o ha sido cancelada.',
  })
  estado: boolean;

  //======= Relaciones con otras entidades
  //comment: 'Relación con los equipos alquilados para la reserva.',
  @OneToMany(() => AlquilerXEquipoEntity, (alquiler) => alquiler.reserva, {})
  alquilerEquipo: AlquilerXEquipoEntity[];

  //comment: 'Relación con los adornos alquilados para la reserva.',
  @OneToMany(() => AdornoXAlquilerEntity, (alquiler) => alquiler.reserva, {})
  alquilerAdorno: AdornoXAlquilerEntity[];
}
