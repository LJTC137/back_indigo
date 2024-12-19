import { hash } from "crypto";
import { AlquilerEntity } from "src/alquiler/alquiler.entity";
import { TipoUsuarioEntity } from "src/tipo_usuario/tipo_usuario.entity";
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'usuario' })
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  idUsuario: number;

  @Column({ type: 'character varying', length: '70', nullable: false })
  nombres: string;

  @Column({ type: 'character varying', length: '13', nullable: false })
  identificacion: string;

  @Column({ type: 'character varying', length: '100', nullable: false })
  correo: string;

  @Column({ type: 'character varying', length: '100', nullable: false })
  contrasenia: string;

  @Column({ type: 'boolean', default: true, nullable: false })
  estado: boolean;

  //============== Foreign keys
  //======= Alquiler
  @OneToMany(() => AlquilerEntity, (alquiler) => alquiler.usuario)
  usuarioAlquiler: AlquilerEntity[];

  //======= Tipo Usuario
  @ManyToMany(() => TipoUsuarioEntity, (rol) => rol.tipo_usuario, {
    eager: true,
  })
  @JoinTable({
    name: 'usuario_tipoUsuario',
    joinColumn: { name: 'usuario_id' },
    inverseJoinColumn: { name: 'tipoUsuario_id' },
  })
  tipo_usuario: TipoUsuarioEntity[];

  //============== Operaciones
  @BeforeInsert()
  async hashPasword() {
    if (!this.contrasenia) return;
    this.contrasenia = await hash(this.contrasenia, 12);
  }
}