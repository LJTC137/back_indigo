import { AdornoEntity } from 'src/adorno/adorno.entity';
import { ReservaEntity } from 'src/alquiler/alquiler.entity';
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

  @ManyToOne(() => ReservaEntity, (alquiler) => alquiler, { nullable: false })
  @JoinColumn({ name: 'idAlquiler' })
  reserva: ReservaEntity;

  @Column({ nullable: false, type: 'character varying', length: '20' })
  color: string;

  @Column({ nullable: false, type: 'integer' })
  cantidadAdornos: number;
}
