import { BadRequestException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocalEntity } from './local.entity';
import { Repository } from 'typeorm';
import { MessageDto } from 'src/common/message.dto';
import { CreateLocalDto } from './dto/create-local.dto';
import { UpdateLocalDto } from './dto/update-local.dto';

@Injectable()
export class LocalService {
  constructor(
    @InjectRepository(LocalEntity)
    private readonly localRepository: Repository<LocalEntity>,
  ) {}

  // ======= Listar todos los locales
  async getList(): Promise<LocalEntity[]> {
    try {
      return await this.localRepository.find({
        where: { estado: true },
        relations: ['tipoLocal', 'estadoDisponibilidad'],
      });
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al obtener la lista de locales',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======= Obtener local por ID
  async getById(idLocal: number): Promise<LocalEntity> {
    try {
      const local = await this.localRepository.findOne({
        where: { idLocal, estado: true },
        relations: ['tipoLocal', 'estadoDisponibilidad'],
      });

      if (!local) {
        throw new BadRequestException(
          new MessageDto(
            'Local no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      return local;
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al obtener el local',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======== Crear un nuevo local
  async create(createLocalDto: CreateLocalDto): Promise<MessageDto> {
    try {
      const local = this.localRepository.create(createLocalDto);
      const savedLocal = await this.localRepository.save(local);

      return new MessageDto(
        'Local registrado correctamente',
        'success',
        HttpStatus.CREATED,
        savedLocal.idLocal,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al registrar el local',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======== Actualizar un local existente
  async update(
    idLocal: number,
    updateLocalDto: UpdateLocalDto,
  ): Promise<MessageDto> {
    try {
      const local = await this.localRepository.findOne({ where: { idLocal } });

      if (!local) {
        throw new BadRequestException(
          new MessageDto(
            'Local no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      await this.localRepository.update(idLocal, updateLocalDto);

      return new MessageDto(
        'Local actualizado correctamente',
        'success',
        HttpStatus.OK,
        idLocal,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al actualizar el local',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======== Eliminar un local (cambio de estado en lugar de borrado físico)
  async delete(idLocal: number): Promise<MessageDto> {
    try {
      const local = await this.localRepository.findOne({ where: { idLocal } });

      if (!local) {
        throw new BadRequestException(
          new MessageDto(
            'Local no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      await this.localRepository.update(idLocal, { estado: false });

      return new MessageDto(
        'Local eliminado correctamente',
        'success',
        HttpStatus.OK,
        idLocal,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al eliminar el local',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }
}
