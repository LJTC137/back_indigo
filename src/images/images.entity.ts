import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('images')
export class ImagesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  // Nombre de la entidad.
  @Column()
  entidadTipo: string;

  // Id del registro en la entidad correspondiente
  @Column()
  entidadId: number;
}
