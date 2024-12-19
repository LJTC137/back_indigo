import { CatalogoEntity } from "src/catalogo/catalogo.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'catering' })
export class CateringEntity{

    @PrimaryGeneratedColumn()
    idCatering: number;

    @Column({ nullable: false, type: 'character varying', length: '50' })
    nombreServicio: string;

    @Column({ nullable: false, type: 'character varying', length: '250' })
    descripcion: string;

    @Column({ nullable: false, type: 'double precision' })
    precioXPersona: number;

    @Column({ nullable: false, type: 'boolean', default: true })
    estado: boolean;

    @ManyToOne(() => CatalogoEntity, (catalogo) => catalogo.catalogoTipoCatering, { nullable: false })
    @JoinColumn({ name: 'tipoCatering' })
    tipoCatering: CatalogoEntity;
}