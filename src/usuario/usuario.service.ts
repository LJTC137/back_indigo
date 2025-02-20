import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoUsuarioEntity } from 'src/tipo_usuario/tipo_usuario.entity';
import { UsuarioEntity } from './usuario.entity';
import { In, Repository } from 'typeorm';
import { MessageDto } from 'src/common/message.dto';
import { CreateUsuarioDto } from './dto/create-user.dto';
import { TipoEnum } from 'src/tipo_usuario/tipo_usuario.enum';
import { UpdateUsuarioDto } from './dto/update-user.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(TipoUsuarioEntity)
    private readonly tipoUsuarioRepository: Repository<TipoUsuarioEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async getUsuariosList(): Promise<UsuarioEntity[]> {
    const usuarios = await this.usuarioRepository.find();
    if (!usuarios.length)
      throw new NotFoundException(
        new MessageDto('No existe un listado de usuarios'),
      );
    return usuarios;
  }

  async getUsuarioById(idUsuario: number) {
    return await this.usuarioRepository.findOne({
      where: {
        idUsuario,
      },
    });
  }

  async deleteUsuario(idUsuario: number) {
    return this.usuarioRepository.delete({ idUsuario });
  }

  async updateUsuario(idUsuario: number, usuario: UpdateUsuarioDto) {
    const { tipo_usuario, ...updateData } = usuario;

    await this.usuarioRepository.update(idUsuario, updateData);

    const usuarioExistente = await this.usuarioRepository.findOne({
      where: { idUsuario },
      relations: ['tipo_usuario'],
    });

    if (!usuarioExistente) {
      throw new Error('Usuario no encontrado');
    }

    if (tipo_usuario && tipo_usuario.length > 0) {
      const tiposUsuario = await this.tipoUsuarioRepository.find({
        where: { idTipoUsuario: In(tipo_usuario.map((t) => t.idTipoUsuario)) },
      });

      if (tiposUsuario.length === 0) {
        throw new Error('Tipo de usuario no encontrado');
      }

      usuarioExistente.tipo_usuario = tiposUsuario;
      await this.usuarioRepository.save(usuarioExistente);
    } else {
      usuarioExistente.tipo_usuario = [];
      await this.usuarioRepository.save(usuarioExistente);
    }

    return usuarioExistente;
  }

  async createUsuario(usuario: CreateUsuarioDto): Promise<any> {
    const { identificacion, correo } = usuario;
    console.log(usuario);

    const exists = await this.usuarioRepository.findOne({
      where: [{ identificacion: identificacion }, { correo: correo }],
    });
    if (exists) {
      throw new BadRequestException(new MessageDto('Usuario ya registrado'));
    }

    const user = this.usuarioRepository.create(usuario);

    await this.usuarioRepository.save(user);
    return new MessageDto('Cliente creado');
  }
}
