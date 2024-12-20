import { AlquilerEntity } from "src/alquiler/alquiler.entity";
import { CatalogoEntity } from "src/catalogo/catalogo.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'producto_tecnico' })
export class ProductoTecnicoEntity {

    @PrimaryGeneratedColumn()
    idProducto: number;

    @Column({ nullable: false, type: 'character varying', length: '250' })
    descripcion: string;

    @Column({ nullable: false, type: 'boolean', default: true })
    esDisponible: boolean;

    @Column({ nullable: false, type: 'boolean', default: true })
    estado: boolean;

    @Column({ nullable: false, type: 'character varying', length: '50' })
    nombre: string;

    @Column({ nullable: false, type: 'character varying', length: '75' })
    ubicacionProducto: string;

    @Column({ nullable: false, type: 'date' })
    fechaAdquisicion: Date;

    @Column({ nullable: false, type: 'character varying', length: '100' })
    capacidadTecnica: string;

    //============== Foreign key
    //======= Alquiler
    @ManyToMany(() => AlquilerEntity, (alquiler) => alquiler.alquilerProducto)
    productoAlquiler: AlquilerEntity[];

    //======= Catalogo
    @ManyToOne(() => CatalogoEntity, (catalogo) => catalogo.catalogoEstadoProducto, { nullable: false })
    @JoinColumn({ name: 'estadoEquipo' })
    estadoEquipo: CatalogoEntity;

    @ManyToOne(() => CatalogoEntity, (catalogo) => catalogo.catalogoTipoProducto, { nullable: false })
    @JoinColumn({ name: 'tipoProducto' })
    tipoProducto: CatalogoEntity;
}