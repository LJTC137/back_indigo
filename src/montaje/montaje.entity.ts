import { ReservaEntity } from 'src/alquiler/alquiler.entity';
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
 * Entidad que representa la tabla "montaje".
 * Tabla encargada de gestionar los montajes disponibles para los eventos.
 */
@Entity({
  name: 'montaje',
  comment:
    'Tabla encargada de gestionar los montajes disponibles para los eventos.',
})
export class MontajeEntity {
  /**
   * Primary key tipo serial para los montajes.
   */
  @PrimaryGeneratedColumn({
    comment: 'Primary key tipo serial para los montajes.',
  })
  idMontaje: number;

  /**
   * Character varying para describir el montaje en detalle.
   */
  @Column({
    nullable: false,
    type: 'character varying',
    length: '250',
    comment: 'Character varying para describir el montaje en detalle.',
  })
  descripcion: string;

  /**
   * Booleano para indicar si el montaje está disponible.
   */
  @Column({
    nullable: false,
    type: 'boolean',
    default: true,
    comment: 'Booleano para indicar si el montaje está disponible.',
  })
  esDisponible: boolean;

  /**
   * Booleano para el estado de eliminado del montaje.
   */
  @Column({
    nullable: false,
    type: 'boolean',
    default: true,
    comment: 'Booleano para el estado de eliminado del montaje.',
  })
  estado: boolean;

  /**
   * Integer para la capacidad máxima del montaje en términos de personas en caso de mesas.
   */
  @Column({
    nullable: false,
    type: 'integer',
    comment:
      'Integer para la capacidad máxima del montaje en términos de personas en caso de mesas.',
  })
  capacidadMaxima: number;

  /**
   * Decimal para el costo por mesa del montaje en caso de solo mesas.
   */
  @Column({
    nullable: false,
    type: 'double precision',
    comment:
      'Decimal para el costo por mesa del montaje en caso de solo mesas.',
  })
  costoMesa: number;

  /**
   * Decimal para el costo por silla del montaje en caso de solo sillas.
   */
  @Column({
    nullable: false,
    type: 'double precision',
    comment:
      'Decimal para el costo por silla del montaje en caso de solo sillas.',
  })
  costoSilla: number;

  /**
   * Decimal para el costo de un paquete completo de montaje en caso de sillas y mesas.
   */
  @Column({
    nullable: false,
    type: 'double precision',
    comment:
      'Decimal para el costo de un paquete completo de montaje en caso de sillas y mesas.',
  })
  costoPack: number;

  /**
   * Decimal para el monto del depósito reembolsable asociado al montaje en caso de cualquier daño o prejuicio a los montajes.
   */
  @Column({
    nullable: false,
    type: 'double precision',
    comment:
      'Decimal para el monto del depósito reembolsable asociado al montaje en caso de cualquier daño o prejuicio a los montajes.',
  })
  depositoReembolsable: number;

  /**
   * Character varying para el nombre o referencia del montaje.
   */
  @Column({
    nullable: false,
    type: 'character varying',
    length: '50',
    comment: 'Character varying para el nombre o referencia del montaje.',
  })
  nombre: string;

  //============== Relaciones

  /**
   * Relación uno a muchos con la entidad Alquiler.
   * Un montaje puede estar asociado a varios alquileres.
   */
  @OneToMany(() => ReservaEntity, (alquiler) => alquiler.montaje)
  montajeAlquiler: ReservaEntity[];

  /**
   * Foreign key de la tabla catálogo para el tipo de cobro (por evento, por horas).
   */
  @ManyToOne(() => CatalogoEntity, (catalogo) => catalogo.catalogoTipoCobro, {
    nullable: false,
  })
  @JoinColumn({ name: 'tipoCobro' })
  tipoCobro: CatalogoEntity;

  /**
   * Foreign key de la tabla catálogo para el tipo de montaje (clásico, moderno, rústico, etc.).
   */
  @ManyToOne(() => CatalogoEntity, (catalogo) => catalogo.catalogoTipoMontaje, {
    nullable: false,
  })
  @JoinColumn({ name: 'tipoMontaje' })
  tipoMontaje: CatalogoEntity;
}
