import { AdornoEntity } from 'src/adorno/adorno.entity';
import { ReservaEntity } from 'src/alquiler/alquiler.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'adorno_alquiler',
  comment: 'Tabla intermedia para la relación N:M entre adornos y alquileres.',
})
export class AdornoXAlquilerEntity {
  @PrimaryGeneratedColumn({
    comment:
      'Primary key tipo serial para la tabla intermedia entre adornos y alquileres.',
  })
  idAdornoXAlquiler: number;

  //comment: 'Referencia al adorno alquilado.',
  @ManyToOne(() => AdornoEntity, (adorno) => adorno, {
    nullable: false,
  })
  @JoinColumn({ name: 'idAdorno' })
  adorno: AdornoEntity;

  //comment: 'Referencia a la reserva en la que se incluye el adorno.',
  @ManyToOne(() => ReservaEntity, (alquiler) => alquiler, {
    nullable: false,
  })
  @JoinColumn({ name: 'idAlquiler' })
  reserva: ReservaEntity;

  @Column({
    nullable: false,
    type: 'character varying',
    length: '20',
    comment: 'Color del adorno seleccionado en la reserva.',
  })
  color: string;

  @Column({
    nullable: false,
    type: 'integer',
    comment: 'Cantidad de adornos de este tipo en la reserva.',
  })
  cantidadAdornos: number;
}
