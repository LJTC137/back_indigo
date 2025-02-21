import {
  BadRequestException,
  Injectable,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoUsuarioEntity } from 'src/tipo_usuario/tipo_usuario.entity';
import { UsuarioEntity } from './usuario.entity';
import { In, Repository } from 'typeorm';
import { MessageDto } from 'src/common/message.dto';
import { CreateUsuarioDto } from './dto/create-user.dto';
import { UpdateUsuarioDto } from './dto/update-user.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(TipoUsuarioEntity)
    private readonly tipoUsuarioRepository: Repository<TipoUsuarioEntity>,

    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  // ======= Obtener lista de usuarios
  async getUsuariosList(): Promise<UsuarioEntity[]> {
    try {
      const usuarios = await this.usuarioRepository.find();
      if (!usuarios.length) {
        throw new NotFoundException(
          new MessageDto(
            'No existe un listado de usuarios',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }
      return usuarios;
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al obtener la lista de usuarios',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======= Obtener usuario por ID
  async getUsuarioById(idUsuario: number): Promise<UsuarioEntity> {
    try {
      const usuario = await this.usuarioRepository.findOne({
        where: { idUsuario },
        relations: ['tipo_usuario'],
      });

      if (!usuario) {
        throw new NotFoundException(
          new MessageDto(
            'Usuario no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      return usuario;
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al obtener el usuario',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======= Eliminar usuario (cambio de estado en lugar de borrado físico)
  async deleteUsuario(idUsuario: number): Promise<MessageDto> {
    try {
      const usuario = await this.usuarioRepository.findOne({
        where: { idUsuario },
      });

      if (!usuario) {
        throw new NotFoundException(
          new MessageDto(
            'Usuario no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      await this.usuarioRepository.update(idUsuario, { estado: false });

      return new MessageDto(
        'Usuario eliminado correctamente',
        'success',
        HttpStatus.OK,
        idUsuario,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al eliminar el usuario',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======= Actualizar usuario
  async updateUsuario(
    idUsuario: number,
    usuarioDto: UpdateUsuarioDto,
  ): Promise<MessageDto> {
    try {
      const usuario = await this.usuarioRepository.findOne({
        where: { idUsuario },
        relations: ['tipo_usuario'],
      });

      if (!usuario) {
        throw new NotFoundException(
          new MessageDto(
            'Usuario no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      const { tipo_usuario, ...updateData } = usuarioDto;
      await this.usuarioRepository.update(idUsuario, updateData);

      // Actualizar tipo de usuario si es necesario
      if (tipo_usuario && tipo_usuario.length > 0) {
        const tiposUsuario = await this.tipoUsuarioRepository.find({
          where: {
            idTipoUsuario: In(tipo_usuario.map((t) => t.idTipoUsuario)),
          },
        });

        if (tiposUsuario.length !== tipo_usuario.length) {
          throw new BadRequestException(
            new MessageDto(
              'Uno o más tipos de usuario no existen',
              'error',
              HttpStatus.BAD_REQUEST,
              0,
            ),
          );
        }

        usuario.tipo_usuario = tiposUsuario;
      } else {
        usuario.tipo_usuario = [];
      }

      await this.usuarioRepository.save(usuario);

      return new MessageDto(
        'Usuario actualizado correctamente',
        'success',
        HttpStatus.OK,
        idUsuario,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al actualizar el usuario',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======= Crear usuario
  async createUsuario(usuarioDto: CreateUsuarioDto): Promise<MessageDto> {
    try {
      const { identificacion, correo } = usuarioDto;

      const exists = await this.usuarioRepository.findOne({
        where: [{ identificacion }, { correo }],
      });

      if (exists) {
        throw new BadRequestException(
          new MessageDto(
            'Usuario ya registrado',
            'error',
            HttpStatus.BAD_REQUEST,
            0,
          ),
        );
      }

      const user = this.usuarioRepository.create(usuarioDto);
      const savedUser = await this.usuarioRepository.save(user);

      return new MessageDto(
        'Usuario creado correctamente',
        'success',
        HttpStatus.CREATED,
        savedUser.idUsuario,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al registrar el usuario',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }
}
