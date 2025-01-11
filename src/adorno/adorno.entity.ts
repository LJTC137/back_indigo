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

@Entity({ name: 'adorno' })
export class AdornoEntity {
  @PrimaryGeneratedColumn()
  idAdorno: number;

  @Column({ nullable: false, type: 'character varying', length: '250' })
  descripcion: string;

  @Column({ nullable: false, type: 'character varying', length: '50' })
  nombre: string;

  @Column({ nullable: false, type: 'boolean', default: true })
  estado: boolean;

  @Column({ nullable: false, type: 'character varying', length: '75' })
  dimensiones: string;

  @Column({ nullable: false, type: 'double precision' })
  precioUnitario: number;

  @Column({ nullable: false, type: 'integer' })
  cantidad: number;

  //==================== Foreign key
  //========== Adorno
  @OneToMany(
    () => AdornoXAlquilerEntity,
    (adornoAlquiler) => adornoAlquiler.adorno,
  )
  adornoAlquiler: AdornoXAlquilerEntity[];

  //========== Catalogo
  @ManyToOne(() => CatalogoEntity, (catalogo) => catalogo.catalogoTipoAdorno, {
    nullable: false,
  })
  @JoinColumn({ name: 'tipoAdorno' })
  tipoAdorno: CatalogoEntity;

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
