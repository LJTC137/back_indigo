import { AlquilerEntity } from 'src/alquiler/alquiler.entity';
import { CatalogoEntity } from 'src/catalogo/catalogo.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'montaje' })
export class MontajeEntity {
  @PrimaryGeneratedColumn()
  idMontaje: number;

  @Column({ nullable: false, type: 'character varying', length: '250' })
  descripcion: string;

  @Column({ nullable: false, type: 'boolean', default: true })
  esDisponible: boolean;

  @Column({ nullable: false, type: 'boolean', default: true })
  estado: boolean;

  @Column({ nullable: false, type: 'integer' })
  capacidadMaxima: number;

  @Column({ nullable: false, type: 'double precision' })
  costoMesa: number;

  @Column({ nullable: false, type: 'double precision' })
  costoSilla: number;

  @Column({ nullable: false, type: 'double precision' })
  costoPack: number;

  @Column({ nullable: false, type: 'double precision' })
  depositoReembolsable: number;

  @Column({ nullable: false, type: 'character varying', length: '50' })
  nombre: string;

  //============== Foreign keys
  //======= Alquiler
  @OneToMany(() => AlquilerEntity, (alquiler) => alquiler.montaje)
  montajeAlquiler: AlquilerEntity[];

  //======= Catalogo
  @ManyToOne(() => CatalogoEntity, (catalogo) => catalogo.catalogoTipoCobro, {
    nullable: false,
  })
  @JoinColumn({ name: 'tipoCobro' })
  tipoCobro: CatalogoEntity;

  @ManyToOne(() => CatalogoEntity, (catalogo) => catalogo.catalogoTipoMontaje, {
    nullable: false,
  })
  @JoinColumn({ name: 'tipoMontaje' })
  tipoMontaje: CatalogoEntity;
}
