import { AlquilerXEquipoEntity } from 'src/alquiler_x_equipo/alquiler_x_equipo.entity';
import { CatalogoEntity } from 'src/catalogo/catalogo.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * Entidad que representa la tabla "equipo_servicio".
 * Tabla de registro para los equipos de empleados que están disponibles para dar servicio.
 */
@Entity({
  name: 'equipo_servicio',
  comment:
    'Tabla de registro para los equipos de empleados que están disponibles para dar servicio.',
})
export class EquipoServicioEntity {
  /**
   * Primary key tipo serial para los equipos de servicio.
   */
  @PrimaryGeneratedColumn({
    comment: 'Primary key tipo serial para los equipos de servicio.',
  })
  idEquipo: number;

  /**
   * Character varying campo para dar detalles o información sobre el equipo.
   */
  @Column({
    nullable: false,
    type: 'character varying',
    length: '250',
    comment:
      'Character varying campo para dar detalles o información sobre el equipo.',
  })
  descripcion: string;

  /**
   * Decimal para el costo del alquiler del equipo por todo el evento.
   */
  @Column({
    nullable: false,
    type: 'double precision',
    comment:
      'Decimal para el costo del alquiler del equipo por todo el evento.',
  })
  tarifaXEvento: number;

  /**
   * Integer para la cantidad de personas que conforman el equipo de servicio.
   */
  @Column({
    nullable: false,
    type: 'integer',
    comment:
      'Integer para la cantidad de personas que conforman el equipo de servicio.',
  })
  cantidadPersonas: number;

  /**
   * Booleano para el estado de eliminado del equipo.
   */
  @Column({
    nullable: false,
    type: 'boolean',
    default: true,
    comment: 'Booleano para el estado de eliminado del equipo.',
  })
  estado: boolean;

  /**
   * Decimal para el costo de alquiler del equipo por hora.
   */
  @Column({
    nullable: false,
    type: 'double precision',
    comment: 'Decimal para el costo de alquiler del equipo por hora.',
  })
  precioXHora: number;

  /**
   * Booleano para el estado de disponibilidad del equipo.
   */
  @Column({
    nullable: false,
    type: 'boolean',
    default: true,
    comment: 'Booleano para el estado de disponibilidad del equipo.',
  })
  esDisponible: boolean;

  //============== Relaciones

  /**
   * Relación uno a muchos con la entidad AlquilerXEquipo.
   * Un equipo de servicio puede estar asociado a múltiples registros en la tabla de rompimiento entre equipo y alquiler.
   */
  @OneToMany(
    () => AlquilerXEquipoEntity,
    (alquilerEquipo) => alquilerEquipo.equipo,
  )
  equipoAlquiler: AlquilerXEquipoEntity[];

  /**
   * Foreign key de la tabla catálogo para el tipo de contratación que tienen los empleados del equipo:
   * pago por horas, pago por evento.
   */
  @ManyToOne(
    () => CatalogoEntity,
    (catalogo) => catalogo.catalogoTipoContratacion,
    { nullable: false },
  )
  @JoinColumn({ name: 'tipoContratacion' })
  tipoContratacion: CatalogoEntity;

  /**
   * Foreign key de la tabla catálogo para el tipo de equipo:
   * equipo montaje, equipo técnico, equipo catering.
   */
  @ManyToOne(() => CatalogoEntity, (catalogo) => catalogo.catalogoTipoEquipo, {
    nullable: false,
  })
  @JoinColumn({ name: 'tipoEquipo' })
  tipoEquipo: CatalogoEntity;
}
