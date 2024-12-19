import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'color' })
export class ColorEntity{

    @PrimaryGeneratedColumn()
    idColor: number;

    @Column({ nullable: false, type: 'character varying', length: '20' })
    nombre: string;

    @Column({ nullable: false, type: 'character varying', length: '7' })
    hexadecimal: string;

    @Column({ nullable: false, type: 'boolean', default: true })
    estado: boolean

}