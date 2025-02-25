import { AdornoEntity } from 'src/adorno/adorno.entity';
import { ReservaEntity } from 'src/alquiler/alquiler.entity';
import { CateringEntity } from 'src/catering/catering.entity';
import { EquipoServicioEntity } from 'src/equipo_servicio/equipo_servicio.entity';
import { LocalEntity } from 'src/local/local.entity';
import { MontajeEntity } from 'src/montaje/montaje.entity';
import { ProductoTecnicoEntity } from 'src/producto_tecnico/producto_tecnico.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'catalogo',
  comment:
    'Tabla que almacena los distintos tipos de catálogos utilizados en el sistema.',
})
export class CatalogoEntity {
  @PrimaryGeneratedColumn({
    comment: 'Primary key tipo serial para el catálogo.',
  })
  idCatalogo: number;

  @Column({
    nullable: false,
    type: 'character varying',
    length: '70',
    comment:
      'Nombre del catálogo, representa una categoría de datos en el sistema.',
  })
  nombreCatalogo: string;

  @Column({
    nullable: false,
    type: 'character varying',
    length: '70',
    comment: 'Valor específico dentro de la categoría de catálogo.',
  })
  valorCatalogo: string;

  @Column({
    default: true,
    nullable: false,
    type: 'boolean',
    comment: 'Indica si el catálogo está activo o inactivo en el sistema.',
  })
  estado: boolean;

  //==========Adornos
  @OneToMany(() => AdornoEntity, (adorno) => adorno.tipoAdorno)
  catalogoTipoAdorno: AdornoEntity[];

  //==========Alquiler
  @OneToMany(() => ReservaEntity, (alquiler) => alquiler.estadoReserva)
  catalogoEstadoAlquiler: ReservaEntity[];

  @OneToMany(() => ReservaEntity, (alquiler) => alquiler.tipoEvento)
  catalogoTipoAlquiler: ReservaEntity[];

  //==========Catering
  @OneToMany(() => CateringEntity, (catering) => catering.tipoCatering)
  catalogoTipoCatering: CateringEntity[];

  //==========Equipo servicio
  @OneToMany(
    () => EquipoServicioEntity,
    (equipoServicio) => equipoServicio.tipoContratacion,
  )
  catalogoTipoContratacion: EquipoServicioEntity[];

  @OneToMany(
    () => EquipoServicioEntity,
    (equipoServicio) => equipoServicio.tipoEquipo,
  )
  catalogoTipoEquipo: EquipoServicioEntity[];

  //==========Local
  @OneToMany(() => LocalEntity, (local) => local.estadoDisponibilidad)
  catalogoEstadoLocal: LocalEntity[];

  @OneToMany(() => LocalEntity, (local) => local.tipoLocal)
  catalogoTipoLocal: LocalEntity[];

  //==========Montaje
  @OneToMany(() => MontajeEntity, (montaje) => montaje.tipoCobro)
  catalogoTipoCobro: MontajeEntity[];

  @OneToMany(() => MontajeEntity, (montaje) => montaje.tipoMontaje)
  catalogoTipoMontaje: MontajeEntity[];

  //==========Productos Tecnicos
  @OneToMany(
    () => ProductoTecnicoEntity,
    (productoTecnico) => productoTecnico.estadoEquipo,
  )
  catalogoEstadoProducto: ProductoTecnicoEntity[];

  @OneToMany(
    () => ProductoTecnicoEntity,
    (productoTecnico) => productoTecnico.tipoProducto,
  )
  catalogoTipoProducto: ProductoTecnicoEntity[];
}
