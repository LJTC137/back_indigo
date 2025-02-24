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
 * Entidad que representa la tabla "local".
 * Tabla encargada de registrar los locales disponibles para los eventos.
 */
@Entity({
  name: 'local',
  comment:
    'Tabla encargada de registrar los locales disponibles para los eventos.',
})
export class LocalEntity {
  /**
   * Primary key tipo serial para los locales.
   */
  @PrimaryGeneratedColumn({
    comment: 'Primary key tipo serial para los locales.',
  })
  idLocal: number;

  /**
   * Character varying para registrar la dirección física del local.
   */
  @Column({
    nullable: false,
    type: 'character varying',
    length: '50',
    comment: 'Character varying para registrar la dirección física del local.',
  })
  direccion: string;

  /**
   * Character varying para indicar el sector o zona del local.
   */
  @Column({
    nullable: false,
    type: 'character varying',
    length: '20',
    comment: 'Character varying para indicar el sector o zona del local.',
  })
  sector: string;

  /**
   * Character varying para el nombre o identificador del local.
   */
  @Column({
    nullable: false,
    type: 'character varying',
    length: '20',
    comment: 'Character varying para el nombre o identificador del local.',
  })
  nombreLocal: string;

  /**
   * Character varying para una descripción detallada del local.
   */
  @Column({
    nullable: false,
    type: 'character varying',
    length: '250',
    comment: 'Character varying para una descripción detallada del local.',
  })
  descripcion: string;

  /**
   * Character varying para registrar las dimensiones del local.
   */
  @Column({
    nullable: false,
    type: 'character varying',
    length: '10',
    comment: 'Character varying para registrar las dimensiones del local.',
  })
  dimensiones: string;

  /**
   * Booleano para indicar si el local está eliminado.
   */
  @Column({
    nullable: false,
    type: 'boolean',
    default: true,
    comment: 'Booleano para indicar si el local está eliminado.',
  })
  estado: boolean;

  /**
   * Decimal para el costo del local por hora.
   */
  @Column({
    nullable: false,
    type: 'double precision',
    comment: 'Decimal para el costo del local por hora.',
  })
  tarifaXHora: number;

  /**
   * Decimal para el costo del local por día.
   */
  @Column({
    nullable: false,
    type: 'double precision',
    comment: 'Decimal para el costo del local por día.',
  })
  tarifaXDia: number;

  /**
   * Integer para el número máximo de personas permitido en el local.
   */
  @Column({
    nullable: false,
    type: 'integer',
    comment: 'Integer para el número máximo de personas permitido en el local.',
  })
  aforo: number;

  /**
   * Foreign key tipo integer de la tabla catálogo que indica si el local está disponible, en mantenimiento u ocupado.
   */
  @ManyToOne(() => CatalogoEntity, (catalogo) => catalogo.catalogoEstadoLocal, {
    nullable: false,
  })
  @JoinColumn()
  estadoDisponibilidad: CatalogoEntity;

  /**
   * Foreign key tipo integer de la tabla catálogo que indica el tipo de local: salón, quinta, espacio abierto.
   */
  @ManyToOne(() => CatalogoEntity, (catalogo) => catalogo.catalogoTipoLocal, {
    nullable: false,
  })
  @JoinColumn()
  tipoLocal: CatalogoEntity;

  /**
   * Relación uno a muchos con la entidad Alquiler.
   * Un local puede tener varios alquileres asociados.
   */
  @OneToMany(() => ReservaEntity, (alquiler) => alquiler.local)
  localAlquiler: ReservaEntity[];
}
