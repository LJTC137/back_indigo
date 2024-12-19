import { TipoUsuarioEntity } from "src/tipo_usuario/tipo_usuario.entity";
import { Column, Entity, JoinTable, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'usuario'})
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    idUsuario: number;

    @Column({ type: 'character varying', length:'70', nullable: false})
    nombres: string;

    @Column({ type:'character varying', length:'13', nullable: false })
    identificacion: string;

    @Column({ type: 'character varying', length:'100', nullable: false })
    correo: string;

    @Column({ type: 'character varying', length:'100', nullable: false })
    contrasenia: string;

    @Column({ type: 'boolean', default: true, nullable: false})
    estado: boolean;

    @JoinTable({
        name: 'usuario_tipoUsuario',
        joinColumn: { name: 'usuario_id' },
        inverseJoinColumn: { name: 'tipoUsuario_id' },
      })
      tipo_usuario: TipoUsuarioEntity[];
}