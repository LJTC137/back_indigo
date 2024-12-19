import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

}