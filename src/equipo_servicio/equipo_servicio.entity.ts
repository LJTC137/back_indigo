import { AlquilerXEquipoEntity } from 'src/alquiler_x_equipo/alquiler_x_equipo.entity';
import { CatalogoEntity } from 'src/catalogo/catalogo.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'equipo_servicio' })
export class EquipoServicioEntity {
  @PrimaryGeneratedColumn()
  idEquipo: number;

  @Column({ nullable: false, type: 'character varying', length: '250' })
  descripcion: string;

  @Column({ nullable: false, type: 'double precision' })
  tarifaXEvento: number;

  @Column({ nullable: false, type: 'integer' })
  cantidadPersonas: number;

  @Column({ nullable: false, type: 'boolean', default: true })
  estado: boolean;

  @Column({ nullable: false, type: 'double precision' })
  precioXHora: number;

  @Column({ nullable: false, type: 'boolean', default: true })
  esDisponible: boolean;

  //============== Foreign keys
  //======= Alquiler Equipo
  @OneToMany(
    () => AlquilerXEquipoEntity,
    (alquilerEquipo) => alquilerEquipo.equipo,
  )
  equipoAlquiler: AlquilerXEquipoEntity[];

  //======= Catalogo
  @ManyToOne(
    () => CatalogoEntity,
    (catalogo) => catalogo.catalogoTipoContratacion,
    { nullable: false },
  )
  @JoinColumn({ name: 'tipoContratacion' })
  tipoContratacion: CatalogoEntity;

  @ManyToOne(() => CatalogoEntity, (catalogo) => catalogo.catalogoTipoEquipo, {
    nullable: false,
  })
  @JoinColumn({ name: 'tipoEquipo' })
  tipoEquipo: CatalogoEntity;
}
