import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
