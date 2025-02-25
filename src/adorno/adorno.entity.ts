import { AdornoXAlquilerEntity } from 'src/adorno_x_alquiler/adorno_x_alquiler.entity';
import { CatalogoEntity } from 'src/catalogo/catalogo.entity';
import { ColorEntity } from 'src/color/color.entity';
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

@Entity({
  name: 'adorno',
  comment:
    'Tabla encargada de gestionar los adornos disponibles para los eventos.',
})
export class AdornoEntity {
  @PrimaryGeneratedColumn({
    comment: 'Primary key tipo serial para los adornos.',
  })
  idAdorno: number;

  @Column({
    nullable: false,
    type: 'character varying',
    length: '250',
    comment: 'Descripción detallada del adorno.',
  })
  descripcion: string;

  @Column({
    nullable: false,
    type: 'character varying',
    length: '50',
    comment: 'Nombre del adorno.',
  })
  nombre: string;

  @Column({
    nullable: false,
    type: 'boolean',
    default: true,
    comment: 'Booleano para indicar el estado de eliminado del adorno.',
  })
  estado: boolean;

  @Column({
    nullable: false,
    type: 'character varying',
    length: '75',
    comment: 'Dimensiones del adorno.',
  })
  dimensiones: string;

  @Column({
    nullable: false,
    type: 'double precision',
    comment: 'Precio unitario del adorno.',
  })
  precioUnitario: number;

  @Column({
    nullable: false,
    type: 'integer',
    comment: 'Cantidad disponible del adorno.',
  })
  cantidad: number;

  //==================== Foreign key
  //========== Adorno
  //comment: 'Relación de N:M entre adornos y alquileres.'
  @OneToMany(
    () => AdornoXAlquilerEntity,
    (adornoAlquiler) => adornoAlquiler.adorno,
  )
  adornoAlquiler: AdornoXAlquilerEntity[];

  //========== Catalogo
  //  'Tipo de adorno, vinculado a la tabla catálogo. Ejemplo: centros de mesa, guirnaldas, luces, etc.',
  @ManyToOne(() => CatalogoEntity, (catalogo) => catalogo.catalogoTipoAdorno, {
    nullable: false,
  })
  @JoinColumn({ name: 'tipoAdorno' })
  tipoAdorno: CatalogoEntity;

  //'Relación de N:M entre adornos y colores disponibles.'
  //========== Color
  @ManyToMany(() => ColorEntity, (color) => color.colorAdorno, {
    eager: true,
  })
  @JoinTable({
    name: 'adorno_color',
    joinColumn: { name: 'idAdorno' },
    inverseJoinColumn: { name: 'idColor' },
  })
  adornoColor: ColorEntity[];
}
