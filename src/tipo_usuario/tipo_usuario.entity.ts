import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TipoEnum } from './tipo_usuario.enum';
import { UsuarioEntity } from 'src/usuario/usuario.entity';

/**
 * Entidad que representa la tabla "tipo_usuario".
 */
@Entity({
  name: 'tipo_usuario',
  comment: 'Tabla encargada del catálogo de rol de usuarios.',
})
export class TipoUsuarioEntity {
  /**
   * Primary key tipo serial de la tabla tipo usuario.
   */
  @PrimaryGeneratedColumn({
    comment: 'Primary key tipo serial de la tabla tipo usuario.',
  })
  idTipoUsuario: number;

  /**
   * Character varying del rol de tipo usuario.
   */
  @Column({
    type: 'character varying',
    nullable: false,
    comment: 'Character varying del rol de tipo usuario.',
  })
  nombre_tipo_usuario: TipoEnum;

  /**
   * Relación muchos a muchos con la entidad Usuario.
   * Se utiliza la tabla intermedia "usuario_tipoUsuario" para asociar los usuarios a sus roles.
   */
  @ManyToMany(() => UsuarioEntity, (usuario) => usuario.tipo_usuario)
  tipo_usuario: UsuarioEntity[];
}
