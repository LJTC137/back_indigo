import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Entidad que representa la tabla "images".
 * Tabla polimórfica donde se almacenarán las imágenes de las entidades: adornos, asesores, catering, locales, montajes y productos técnicos.
 */
@Entity({
  name: 'images',
  comment:
    'Tabla polimórfica donde se almacenarán las imágenes de las entidades: adornos, asesores, catering, locales, montajes y productos técnicos.',
})
export class ImagesEntity {
  /**
   * Primary key tipo serial para la tabla de imágenes.
   */
  @PrimaryGeneratedColumn({
    comment: 'Primary key tipo serial para la tabla de imágenes.',
  })
  id: number;

  /**
   * Character varying de la ubicación de la imagen en el almacenamiento interno.
   */
  @Column({
    type: 'character varying',
    comment:
      'Character varying de la ubicación de la imagen en el almacenamiento interno.',
  })
  url: string;

  /**
   * Character varying que indica a qué entidad pertenece la imagen.
   */
  @Column({
    type: 'character varying',
    comment: 'Character varying que indica a qué entidad pertenece la imagen.',
  })
  entidadTipo: string;

  /**
   * Integer para la id de la entidad a la que pertenece la imagen.
   */
  @Column({
    type: 'integer',
    comment: 'Integer para la id de la entidad a la que pertenece la imagen.',
  })
  entidadId: number;
}
