import { AdornoEntity } from 'src/adorno/adorno.entity';
import { AlquilerEntity } from 'src/alquiler/alquiler.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'adorno_alquiler' })
export class AdornoXAlquilerEntity {
  @PrimaryGeneratedColumn()
  idAdornoXAlquiler: number;

  @ManyToOne(() => AdornoEntity, (adorno) => adorno, { nullable: false })
  @JoinColumn({ name: 'idAdorno' })
  adorno: AdornoEntity;

  @ManyToOne(() => AlquilerEntity, (alquiler) => alquiler, { nullable: false })
  @JoinColumn({ name: 'idAlquiler' })
  alquiler: AlquilerEntity;

  @Column({ nullable: false, type: 'character varying', length: '20' })
  color: string;

  @Column({ nullable: false, type: 'integer' })
  cantidadAdornos: number;
}
