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

@Entity({ name: 'reserva' })
export class ReservaEntity {
  @PrimaryGeneratedColumn()
  idReserva: number;

  @Column({ nullable: false, type: 'varchar' })
  nombreClienteReserva: string;

  @Column({ nullable: false, type: 'varchar' })
  identificacionClienteReserva: string;

  @Column({ nullable: false, type: 'varchar' })
  telefonoClienteReserva: string;

  @Column({ nullable: false, type: 'integer' })
  cantidadPersonas: number;

  @Column({ nullable: false, type: 'time' })
  horaInicio: string;

  @Column({ nullable: false, type: 'time' })
  horaFin: string;

  @Column({ nullable: false, type: 'date' })
  fechaInicioEvento: Date;

  @Column({ nullable: false, type: 'date' })
  fechaFinEvento: Date;

  // Relación con asesor
  @ManyToOne(() => AsesorEntity, { nullable: false })
  @JoinColumn({ name: 'idAsesor' })
  asesor: AsesorEntity;

  // Relación con catálogo para tipo de evento
  @ManyToOne(() => CatalogoEntity, { nullable: false })
  @JoinColumn({ name: 'tipoEvento' })
  tipoEvento: CatalogoEntity;

  // Relación con catálogo para estado de reserva
  @ManyToOne(() => CatalogoEntity, { nullable: false })
  @JoinColumn({ name: 'estadoReserva' })
  estadoReserva: CatalogoEntity;

  // Relación ManyToMany con catering
  @ManyToMany(() => CateringEntity, { eager: true })
  @JoinTable({
    name: 'reserva_catering',
    joinColumn: { name: 'idReserva' },
    inverseJoinColumn: { name: 'idCatering' },
  })
  reservaCatering: CateringEntity[];

  // Relación con local
  @ManyToOne(() => LocalEntity, { nullable: false })
  @JoinColumn({ name: 'idLocal' })
  local: LocalEntity;

  // Relación con montaje
  @ManyToOne(() => MontajeEntity, { nullable: false })
  @JoinColumn({ name: 'idMontaje' })
  montaje: MontajeEntity;

  // Relación ManyToMany con producto tecnológico
  @ManyToMany(() => ProductoTecnicoEntity, { eager: true })
  @JoinTable({
    name: 'reserva_producto',
    joinColumn: { name: 'idReserva' },
    inverseJoinColumn: { name: 'idProducto' },
  })
  reservaProducto: ProductoTecnicoEntity[];

  @Column({ nullable: false, type: 'date', default: () => 'CURRENT_DATE' })
  fechaRegistro: Date;

  @Column({ nullable: false, type: 'integer' })
  cantidadSillas: number;

  @Column({ nullable: false, type: 'integer' })
  cantidadMesas: number;

  @Column({ nullable: false, type: 'double precision' })
  costoMontaje: number;

  @Column({ nullable: false, type: 'double precision' })
  costoAdornos: number;

  @Column({ nullable: false, type: 'double precision' })
  costoServicio: number;

  @Column({ nullable: false, type: 'double precision' })
  costoTotal: number;

  @Column({ nullable: false, type: 'boolean', default: true })
  estado: boolean;

  //======= Foreign key
  @OneToMany(() => ReservaEntity, (alquiler) => alquiler.asesor)
  alquilerEquipo: ReservaEntity[];
}
