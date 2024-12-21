import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoUsuarioEntity } from 'src/tipo_usuario/tipo_usuario.entity';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
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
    const { tipo_usuarioId, ...updateData } = usuario;
    console.log(idUsuario, updateData);
    await this.usuarioRepository.update(idUsuario, updateData);
  }

  async createUsuario(usuario: CreateUsuarioDto): Promise<any> {
    const { identificacion, correo } = usuario;
    const exists = await this.usuarioRepository.findOne({
      where: [{ identificacion: identificacion }, { correo: correo }],
    });
    if (exists) {
      throw new BadRequestException(new MessageDto('Usuario ya registrado'));
    }
    const rolUser = await this.tipoUsuarioRepository.findOne({
      where: { nombre_tipo_usuario: TipoEnum.USER },
    });
    if (!rolUser) {
      throw new InternalServerErrorException(
        new MessageDto('Los roles aún no han sido creados'),
      );
    }
    const user = this.usuarioRepository.create(usuario);
    user.tipo_usuario = [rolUser];
    await this.usuarioRepository.save(user);
    return new MessageDto('Cliente creado');
  }
}
