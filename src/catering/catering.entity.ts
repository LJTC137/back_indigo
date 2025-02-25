import { ReservaEntity } from 'src/alquiler/alquiler.entity';
import { CatalogoEntity } from 'src/catalogo/catalogo.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'catering',
  comment:
    'Tabla que almacena los servicios de catering disponibles para las reservas.',
})
export class CateringEntity {
  @PrimaryGeneratedColumn({
    comment:
      'Primary key tipo serial para identificar un servicio de catering.',
  })
  idCatering: number;

  @Column({
    nullable: false,
    type: 'character varying',
    length: '50',
    comment: 'Nombre del servicio de catering.',
  })
  nombreServicio: string;

  @Column({
    nullable: false,
    type: 'character varying',
    length: '250',
    comment: 'Descripción detallada del servicio de catering.',
  })
  descripcion: string;

  @Column({
    nullable: false,
    type: 'double precision',
    comment: 'Precio por persona del servicio de catering.',
  })
  precioXPersona: number;

  @Column({
    nullable: false,
    type: 'boolean',
    default: true,
    comment: 'Indica si el servicio de catering está activo o inactivo.',
  })
  estado: boolean;

  //======= Relaciones con otras entidades

  // Relación ManyToMany con reserva
  @ManyToMany(() => ReservaEntity, (alquiler) => alquiler.reservaCatering, {})
  cateringAlquiler: ReservaEntity[];

  // Relación ManyToOne con catálogo para tipo de catering
  @ManyToOne(
    () => CatalogoEntity,
    (catalogo) => catalogo.catalogoTipoCatering,
    { nullable: false },
  )
  @JoinColumn({ name: 'tipoCatering' })
  tipoCatering: CatalogoEntity;
}
