import { AdornoXAlquilerEntity } from 'src/adorno_x_alquiler/adorno_x_alquiler.entity';
import { AlquilerXEquipoEntity } from 'src/alquiler_x_equipo/alquiler_x_equipo.entity';
import { AsesorEntity } from 'src/asesor/asesor.entity';
import { CatalogoEntity } from 'src/catalogo/catalogo.entity';
import { CateringEntity } from 'src/catering/catering.entity';
import { LocalEntity } from 'src/local/local.entity';
import { MontajeEntity } from 'src/montaje/montaje.entity';
import { ProductoTecnicoEntity } from 'src/producto_tecnico/producto_tecnico.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'alquiler' })
export class AlquilerEntity {
  @PrimaryGeneratedColumn()
  idAlquiler: number;

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

  //==================== Foreign keys
  //========== Adorno
  @OneToMany(
    () => AdornoXAlquilerEntity,
    (alquilerAdorno) => alquilerAdorno.alquiler,
  )
  alquilerAdorno: AdornoXAlquilerEntity[];

  //========== Asesor
  @ManyToOne(() => AsesorEntity, (asesor) => asesor.asesorAlquiler, {
    nullable: false,
  })
  @JoinColumn({ name: 'idAsesor' })
  asesor: AsesorEntity;

  //========== Catalogo
  @ManyToOne(
    () => CatalogoEntity,
    (catalogo) => catalogo.catalogoEstadoAlquiler,
    { nullable: false },
  )
  @JoinColumn({ name: 'estadoAlquiler' })
  estadoAlquiler: CatalogoEntity;

  @ManyToOne(
    () => CatalogoEntity,
    (catalogo) => catalogo.catalogoTipoAlquiler,
    { nullable: false },
  )
  @JoinColumn({ name: 'tipoEvento' })
  tipoEvento: CatalogoEntity;

  //========== Catering
  @ManyToMany(() => CateringEntity, (catering) => catering.cateringAlquiler, {
    eager: true,
  })
  @JoinTable({
    name: 'alquiler_catering',
    joinColumn: { name: 'idAlquiler' },
    inverseJoinColumn: { name: 'idCatering' },
  })
  alquilerCatering: CateringEntity[];

  //========== Equipo servicio
  @OneToMany(
    () => AlquilerXEquipoEntity,
    (alquilerEquipo) => alquilerEquipo.alquiler,
  )
  alquilerEquipo: AlquilerXEquipoEntity[];

  //========== Local
  @ManyToOne(() => LocalEntity, (local) => local.localAlquiler, {
    nullable: false,
  })
  @JoinColumn({ name: 'idLocal' })
  local: LocalEntity;

  //========== Montaje
  @ManyToOne(() => MontajeEntity, (montaje) => montaje.montajeAlquiler, {
    nullable: false,
  })
  @JoinColumn({ name: 'idMontaje' })
  montaje: MontajeEntity;

  //========== Productos tecnicos
  @ManyToMany(
    () => ProductoTecnicoEntity,
    (producto) => producto.productoAlquiler,
    {
      eager: true,
    },
  )
  @JoinTable({
    name: 'alquiler_producto',
    joinColumn: { name: 'idAlquiler' },
    inverseJoinColumn: { name: 'idProducto' },
  })
  alquilerProducto: ProductoTecnicoEntity[];

  //========== usuario
  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.usuarioAlquiler, {
    nullable: false,
  })
  @JoinColumn({ name: 'idUsuario' })
  usuario: UsuarioEntity;
}
