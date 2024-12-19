import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'equipo_servicio' })
export class EquipoServiceEntity{

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
}