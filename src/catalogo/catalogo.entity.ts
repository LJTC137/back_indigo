import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'catalogo' })
export class CatalogoEntity {
  @PrimaryGeneratedColumn()
  idCatalogo: number;

  @Column({ nullable: false, type: 'character varying', length:'70'})
  nombreCatalogo: string;

  @Column({ nullable: false, type: 'character varying', length:'70'})
  valorCatalogo: string;

  @Column({ default: true, nullable: false, type: 'boolean'})
  estado: boolean;
}
