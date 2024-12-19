import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'local' })
export class LocalEntity{

    @PrimaryGeneratedColumn()
    idLocal: number;

    @Column({ nullable: false, type: 'character varying', length: '50'  })
    direccion: string;

    @Column({ nullable: false, type: 'character varying', length: '20' })
    sector: string;

    @Column({ nullable: false, type: 'character varying', length: '20' })
    nombreLocal: string;

    @Column({ nullable: false, type: 'character varying', length: '250' })
    descripcion: string;

    @Column({ nullable: false, type: 'character varying', length: '10' })
    dimensiones: string;

    @Column({ nullable: false, type: 'boolean', default: true })
    estado: boolean;

    @Column({ nullable: false, type: 'double precision' })
    tarifaXHora: number;

    @Column({ nullable: false, type: 'double precision' })
    tarifaXDia: number;

    @Column({ nullable: false, type: 'integer' })
    aforo: number;

}