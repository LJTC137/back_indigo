import { CatalogoEntity } from "src/catalogo/catalogo.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name:'adorno' })
export class AdornoEntity{

    @PrimaryGeneratedColumn()
    idAdorno: number;

    @Column({ nullable: false, type: 'character varying', length:"250" })
    descripcion: string;

    @Column({ nullable: false, type: 'character varying', length:"50" })
    nombre: string;

    @Column({ nullable: false, type: 'boolean', default: true })
    estado: boolean;

    @Column({ nullable: false, type: 'character varying', length:"75" })
    dimensiones: string;

    @Column({ nullable: false, type: 'double precision'})
    precioUnitario: number;

    @Column({ nullable: false, type: 'integer' })
    cantidad: number;

    @ManyToOne(() => CatalogoEntity, (catalogo) => catalogo.catalogoTipoAdorno, { nullable: false })
    @JoinColumn({ name: 'tipoAdorno' })
    tipoAdorno: CatalogoEntity;
}