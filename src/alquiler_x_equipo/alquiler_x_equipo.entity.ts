import { ReservaEntity } from 'src/alquiler/alquiler.entity';
import { EquipoServicioEntity } from 'src/equipo_servicio/equipo_servicio.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'alquiler_equipo' })
export class AlquilerXEquipoEntity {
  @PrimaryGeneratedColumn()
  idReservaXEquipo: number;

  @ManyToOne(() => ReservaEntity, (alquiler) => alquiler.alquilerEquipo, {
    nullable: false,
  })
  @JoinColumn({ name: 'idReserva' })
  reserva: ReservaEntity;

  @ManyToOne(
    () => EquipoServicioEntity,
    (equipoServicio) => equipoServicio.equipoAlquiler,
    { nullable: false },
  )
  @JoinColumn({ name: 'idEquipo' })
  equipo: EquipoServicioEntity;

  @Column({ nullable: false, type: 'integer' })
  horaXServicio: number;
}
