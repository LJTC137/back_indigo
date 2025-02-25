import { ReservaEntity } from 'src/alquiler/alquiler.entity';
import { EquipoServicioEntity } from 'src/equipo_servicio/equipo_servicio.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'alquiler_equipo',
  comment:
    'Tabla intermedia que registra la relación entre reservas y equipos alquilados.',
})
export class AlquilerXEquipoEntity {
  @PrimaryGeneratedColumn({
    comment: 'Primary key tipo serial para la relación de alquiler de equipos.',
  })
  idReservaXEquipo: number;

  //comment: 'Referencia a la reserva a la que pertenece el equipo alquilado.',
  @ManyToOne(() => ReservaEntity, (alquiler) => alquiler.alquilerEquipo, {
    nullable: false,
  })
  @JoinColumn({ name: 'idReserva' })
  reserva: ReservaEntity;

  //comment: 'Referencia al equipo alquilado para la reserva.',
  @ManyToOne(
    () => EquipoServicioEntity,
    (equipoServicio) => equipoServicio.equipoAlquiler,
    {
      nullable: false,
    },
  )
  @JoinColumn({ name: 'idEquipo' })
  equipo: EquipoServicioEntity;

  @Column({
    nullable: false,
    type: 'integer',
    comment: 'Cantidad de horas que se alquila el equipo para el evento.',
  })
  horaXServicio: number;
}
