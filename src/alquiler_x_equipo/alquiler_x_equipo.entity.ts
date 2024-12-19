import { AlquilerEntity } from "src/alquiler/alquiler.entity";
import { EquipoServicioEntity } from "src/equipo_servicio/equipo_servicio.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'alquiler_equipo' })
export class AlquilerXEquipoEntity {

    @PrimaryGeneratedColumn()
    idAlquilerXEquipo: number;

    @ManyToOne(() => AlquilerEntity, (alquiler) => alquiler.alquilerEquipo, { nullable: false })
    @JoinColumn({ name: 'idAlquiler' })
    alquiler: AlquilerEntity;

    @ManyToOne(() => EquipoServicioEntity, (equipoServicio) => equipoServicio.equipoAlquiler, { nullable: false })
    @JoinColumn({ name: 'idEquipo' })
    equipo: EquipoServicioEntity;

    @Column({ nullable: false, type: 'integer' })
    horaXServicio: number;

}