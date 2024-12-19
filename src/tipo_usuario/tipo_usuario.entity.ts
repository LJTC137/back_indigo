import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { TipoEnum } from "./tipo_usuario.enum";
import { UsuarioEntity } from "src/usuario/usuario.entity";

@Entity({ name: 'tipo_usuario' })
export class TipoUsuarioEntity{
    @PrimaryGeneratedColumn()
    id_usuario_rol: number;
  
    @Column({ type: 'character varying', default: 'cliente' })
    nombre_tipo_usuario: TipoEnum;
  
    @ManyToMany(() => UsuarioEntity, (usuario) => usuario.tipo_usuario)
    tipo_usuario: UsuarioEntity[];
}