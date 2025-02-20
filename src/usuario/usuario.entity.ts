import { hash } from 'bcryptjs';
import { AlquilerEntity } from 'src/alquiler/alquiler.entity';
import { TipoUsuarioEntity } from 'src/tipo_usuario/tipo_usuario.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * Entidad que representa la tabla "usuario".
 */
@Entity({
  name: 'usuario',
  comment: 'Tabla encargada del registro de empleados del sistema.',
})
export class UsuarioEntity {
  /**
   * Primary key tipo serial de la tabla usuario.
   */
  @PrimaryGeneratedColumn({
    comment: 'Primary key tipo serial de la tabla usuario.',
  })
  idUsuario: number;

  /**
   * Character varying para los nombres de los empleados con acceso al sistema.
   */
  @Column({
    type: 'character varying',
    length: '70',
    nullable: false,
    comment:
      'Character varying para los nombres de los empleados con acceso al sistema.',
  })
  nombres: string;

  /**
   * Character varying para la cédula, RUC o pasaporte del empleado.
   */
  @Column({
    type: 'character varying',
    length: '13',
    nullable: false,
    comment: 'Character varying para la cédula, RUC o pasaporte del empleado.',
  })
  identificacion: string;

  /**
   * Character varying para el correo electrónico que tiene el usuario.
   */
  @Column({
    type: 'character varying',
    length: '100',
    nullable: false,
    comment:
      'Character varying para el correo electrónico que tiene el usuario.',
  })
  correo: string;

  /**
   * Character varying para la contraseña de acceso al sistema.
   */
  @Column({
    type: 'character varying',
    length: '100',
    nullable: false,
    comment: 'Character varying para la contraseña de acceso al sistema.',
  })
  contrasenia: string;

  /**
   * Booleano para el estado de eliminado del usuario.
   */
  @Column({
    type: 'boolean',
    default: true,
    nullable: false,
    comment: 'Booleano para el estado de eliminado del usuario.',
  })
  estado: boolean;

  // Relaciones

  /**
   * Relación uno a muchos con la entidad Alquiler.
   * Un usuario puede tener varios registros de alquiler.
   */
  @OneToMany(() => AlquilerEntity, (alquiler) => alquiler.usuario)
  usuarioAlquiler: AlquilerEntity[];

  /**
   * Relación muchos a muchos con la entidad TipoUsuario.
   * Se utiliza la tabla intermedia "usuario_tipoUsuario" para asociar roles a los usuarios.
   */
  @ManyToMany(() => TipoUsuarioEntity, (rol) => rol.tipo_usuario, {
    eager: true,
  })
  @JoinTable({
    name: 'usuario_tipoUsuario',
    joinColumn: { name: 'usuario_id' },
    inverseJoinColumn: { name: 'tipoUsuario_id' },
  })
  tipo_usuario: TipoUsuarioEntity[];

  /**
   * Antes de insertar el usuario en la base de datos, se encripta la contraseña.
   */
  @BeforeInsert()
  async hashPasword() {
    if (!this.contrasenia) return;
    this.contrasenia = await hash(this.contrasenia, 12);
  }
}
