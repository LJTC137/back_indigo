import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity({ name: 'alquiler' })
export class AlquilerEntity {
  @PrimaryGeneratedColumn()
  idAsesor: number;

  @Column({ nullable: false, type: 'date' })
  fechaEvento: Date;

  @Column({ nullable: false, type: 'integer' })
  cantidadPersonas: number;

  @Column({ nullable: false, type: 'time' })
  horaInicio: string;

  @Column({ nullable: false, type: 'time' })
  horaFin: string;

  @Column({ nullable: false, type: 'date', default: () => 'CURRENT_DATE' })
  fechaRegistro: Date;

  @Column({ nullable: false, type: 'integer' })
  cantidadSillas: number;

  @Column({ nullable: false, type: 'integer' })
  cantidadMesas: number;

  @Column({ nullable: false, type: 'double precision' })
  costoMontaje: number;

  @Column({ nullable: false, type: 'double precision' })
  costoAdornos: number;

  @Column({ nullable: false, type: 'double precision' })
  costoServicio: number;

  @Column({ nullable: false, type: 'double precision' })
  costoTotal: number;

  @Column({ nullable: false, type: 'boolean', default: true })
  estado: boolean;
}
