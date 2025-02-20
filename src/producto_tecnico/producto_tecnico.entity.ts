import { AlquilerEntity } from 'src/alquiler/alquiler.entity';
import { CatalogoEntity } from 'src/catalogo/catalogo.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * Entidad que representa la tabla "producto_tecnico".
 * Tabla encargada de los productos técnicos disponibles para los eventos.
 */
@Entity({
  name: 'producto_tecnico',
  comment:
    'Tabla encargada de los productos técnicos disponibles para los eventos.',
})
export class ProductoTecnicoEntity {
  /**
   * Primary key tipo serial para los productos técnicos.
   */
  @PrimaryGeneratedColumn({
    comment: 'Primary key tipo serial para los productos técnicos.',
  })
  idProducto: number;

  /**
   * Character varying para describir el producto técnico.
   */
  @Column({
    nullable: false,
    type: 'character varying',
    length: '250',
    comment: 'Character varying para describir el producto técnico.',
  })
  descripcion: string;

  /**
   * Booleano para indicar si el producto está disponible.
   */
  @Column({
    nullable: false,
    type: 'boolean',
    default: true,
    comment: 'Booleano para indicar si el producto está disponible.',
  })
  esDisponible: boolean;

  /**
   * Booleano para indicar si el producto está eliminado.
   */
  @Column({
    nullable: false,
    type: 'boolean',
    default: true,
    comment: 'Booleano para indicar si el producto está eliminado.',
  })
  estado: boolean;

  /**
   * Character varying para el nombre o referencia del producto.
   */
  @Column({
    nullable: false,
    type: 'character varying',
    length: '50',
    comment: 'Character varying para el nombre o referencia del producto.',
  })
  nombre: string;

  /**
   * Character varying para indicar dónde se encuentra almacenado el producto.
   */
  @Column({
    nullable: false,
    type: 'character varying',
    length: '75',
    comment:
      'Character varying para indicar dónde se encuentra almacenado el producto.',
  })
  ubicacionProducto: string;

  /**
   * Date para registrar la fecha de adquisición del producto.
   */
  @Column({
    nullable: false,
    type: 'date',
    comment: 'Date para registrar la fecha de adquisición del producto.',
  })
  fechaAdquisicion: Date;

  /**
   * Character varying para especificar las características técnicas del producto.
   */
  @Column({
    nullable: false,
    type: 'character varying',
    length: '100',
    comment:
      'Character varying para especificar las características técnicas del producto.',
  })
  capacidadTecnica: string;

  //============== Relaciones

  /**
   * Relación muchos a muchos con la entidad Alquiler.
   * Representa los alquileres asociados al producto técnico.
   */
  @ManyToMany(() => AlquilerEntity, (alquiler) => alquiler.alquilerProducto)
  productoAlquiler: AlquilerEntity[];

  /**
   * Foreign key tipo integer de la tabla catálogo para el estado del producto:
   * nuevo, usado, en mantenimiento.
   */
  @ManyToOne(
    () => CatalogoEntity,
    (catalogo) => catalogo.catalogoEstadoProducto,
    { nullable: false },
  )
  @JoinColumn({
    name: 'estadoEquipo',
    // Nota: La opción de "comment" en JoinColumn no siempre se refleja en la base de datos,
    // por lo que se documenta aquí para referencia.
  })
  estadoEquipo: CatalogoEntity;

  /**
   * Foreign key tipo integer de la tabla catálogo que define el tipo de producto técnico:
   * proyector, tarima, etc.
   */
  @ManyToOne(
    () => CatalogoEntity,
    (catalogo) => catalogo.catalogoTipoProducto,
    { nullable: false },
  )
  @JoinColumn({
    name: 'tipoProducto',
    // Nota: La opción de "comment" en JoinColumn no siempre se refleja en la base de datos,
    // por lo que se documenta aquí para referencia.
  })
  tipoProducto: CatalogoEntity;
}
