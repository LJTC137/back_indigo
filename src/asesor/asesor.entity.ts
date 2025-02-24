import { ReservaEntity } from 'src/alquiler/alquiler.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'asesor' })
export class AsesorEntity {
  @PrimaryGeneratedColumn()
  idAsesor: number;

  @Column({ nullable: false, type: 'boolean', default: true })
  esDisponible: boolean;

  @Column({ nullable: false, type: 'character varying', length: '70' })
  nombreCompleto: string;

  @Column({ nullable: false, type: 'character varying', length: '50' })
  correo: string;

  @Column({ nullable: false, type: 'character varying', length: '10' })
  telefono: string;

  @Column({ nullable: false, type: 'boolean', default: true })
  estado: boolean;

  @Column({ nullable: false, type: 'character varying', length: '250' })
  descripcion: string;

  @Column({ nullable: false, type: 'character varying', length: '75' })
  especialidad: string;

  //======= Foreign key
  @OneToMany(() => ReservaEntity, (alquiler) => alquiler.asesor)
  asesorAlquiler: ReservaEntity[];
}
