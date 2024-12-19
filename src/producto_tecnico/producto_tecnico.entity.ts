import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'producto_tecnico' })
export class ProductoTecnicoEntity{

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

}