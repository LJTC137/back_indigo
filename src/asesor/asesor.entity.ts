import { ReservaEntity } from 'src/alquiler/alquiler.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'asesor',
  comment: 'Tabla que almacena la información de los asesores del sistema.',
})
export class AsesorEntity {
  @PrimaryGeneratedColumn({
    comment: 'Primary key tipo serial para el asesor.',
  })
  idAsesor: number;

  @Column({
    nullable: false,
    type: 'boolean',
    default: true,
    comment: 'Indica si el asesor está disponible para asignaciones.',
  })
  esDisponible: boolean;

  @Column({
    nullable: false,
    type: 'character varying',
    length: '70',
    comment: 'Nombre completo del asesor.',
  })
  nombreCompleto: string;

  @Column({
    nullable: false,
    type: 'character varying',
    length: '50',
    comment: 'Correo electrónico del asesor.',
  })
  correo: string;

  @Column({
    nullable: false,
    type: 'character varying',
    length: '10',
    comment: 'Número de teléfono del asesor.',
  })
  telefono: string;

  @Column({
    nullable: false,
    type: 'boolean',
    default: true,
    comment:
      'Estado del asesor, indica si está activo o inactivo en el sistema.',
  })
  estado: boolean;

  @Column({
    nullable: false,
    type: 'character varying',
    length: '250',
    comment: 'Descripción general del asesor y sus servicios.',
  })
  descripcion: string;

  @Column({
    nullable: false,
    type: 'character varying',
    length: '75',
    comment: 'Especialidad del asesor dentro del sistema.',
  })
  especialidad: string;

  //======= Foreign key
  //comment: 'Relación con las reservas que han sido asignadas a este asesor.',
  @OneToMany(() => ReservaEntity, (alquiler) => alquiler.asesor, {})
  asesorAlquiler: ReservaEntity[];
}
