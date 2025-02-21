import {
  BadRequestException,
  Injectable,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoUsuarioEntity } from './tipo_usuario.entity';
import { Repository } from 'typeorm';
import { MessageDto } from 'src/common/message.dto';
import { CreateTipoUsuarioDto } from './dto/create_tipo.dto';

@Injectable()
export class TipoUsuarioService {
  constructor(
    @InjectRepository(TipoUsuarioEntity)
    private readonly tipoUsuarioRepository: Repository<TipoUsuarioEntity>,
  ) {}

  // ======= Obtener todos los tipos de usuario
  async getAll(): Promise<TipoUsuarioEntity[]> {
    try {
      const roles = await this.tipoUsuarioRepository.find();

      if (!roles.length) {
        throw new NotFoundException(
          new MessageDto(
            'No existen tipos de usuario en la lista',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      return roles;
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al obtener la lista de tipos de usuario',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======= Crear un nuevo tipo de usuario
  async create(tipoUsuarioDto: CreateTipoUsuarioDto): Promise<MessageDto> {
    try {
      const exists = await this.tipoUsuarioRepository.findOne({
        where: { nombre_tipo_usuario: tipoUsuarioDto.nombre_tipo_usuario },
      });

      if (exists) {
        throw new BadRequestException(
          new MessageDto(
            'Este tipo de usuario ya existe',
            'error',
            HttpStatus.BAD_REQUEST,
            0,
          ),
        );
      }

      const tipoUsuario = this.tipoUsuarioRepository.create(tipoUsuarioDto);
      const savedTipoUsuario =
        await this.tipoUsuarioRepository.save(tipoUsuario);

      return new MessageDto(
        'Tipo de usuario creado correctamente',
        'success',
        HttpStatus.CREATED,
        savedTipoUsuario.idTipoUsuario,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al crear el tipo de usuario',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }
}
