import { BadRequestException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EquipoServicioEntity } from './equipo_servicio.entity';
import { Repository } from 'typeorm';
import { MessageDto } from 'src/common/message.dto';
import { CreateEquipoServicioDto } from './dto/create-equipo-servicio.dto';
import { UpdateEquipoServicioDto } from './dto/update-equipo-servicio.dto';

@Injectable()
export class EquipoServicioService {
  constructor(
    @InjectRepository(EquipoServicioEntity)
    private readonly equipoRepository: Repository<EquipoServicioEntity>,
  ) {}

  // ======= Listar todos los equipos de servicio
  async getList(): Promise<EquipoServicioEntity[]> {
    try {
      return await this.equipoRepository.find({
        where: { estado: true },
        relations: ['tipoEquipo', 'tipoContratacion'],
      });
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al obtener la lista de equipos de servicio',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======= Obtener equipo de servicio por ID
  async getById(idEquipo: number): Promise<EquipoServicioEntity> {
    try {
      const equipo = await this.equipoRepository.findOne({
        where: { idEquipo, estado: true },
        relations: ['tipoEquipo', 'tipoContratacion'],
      });

      if (!equipo) {
        throw new BadRequestException(
          new MessageDto(
            'Equipo de servicio no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      return equipo;
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al obtener el equipo de servicio',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======== Crear un nuevo equipo de servicio
  async create(
    createEquipoServicioDto: CreateEquipoServicioDto,
  ): Promise<MessageDto> {
    try {
      const equipo = this.equipoRepository.create(createEquipoServicioDto);
      const savedEquipo = await this.equipoRepository.save(equipo);

      return new MessageDto(
        'Equipo de servicio registrado correctamente',
        'success',
        HttpStatus.CREATED,
        savedEquipo.idEquipo,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al registrar el equipo de servicio',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======== Actualizar un equipo de servicio existente
  async update(
    idEquipo: number,
    updateEquipoDto: UpdateEquipoServicioDto,
  ): Promise<MessageDto> {
    try {
      const equipo = await this.equipoRepository.findOne({
        where: { idEquipo },
      });

      if (!equipo) {
        throw new BadRequestException(
          new MessageDto(
            'Equipo de servicio no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      await this.equipoRepository.update(idEquipo, updateEquipoDto);

      return new MessageDto(
        'Equipo de servicio actualizado correctamente',
        'success',
        HttpStatus.OK,
        idEquipo,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al actualizar el equipo de servicio',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======== Eliminar un equipo de servicio (cambio de estado en lugar de borrado físico)
  async delete(idEquipo: number): Promise<MessageDto> {
    try {
      const equipo = await this.equipoRepository.findOne({
        where: { idEquipo },
      });

      if (!equipo) {
        throw new BadRequestException(
          new MessageDto(
            'Equipo de servicio no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      await this.equipoRepository.update(idEquipo, { estado: false });

      return new MessageDto(
        'Equipo de servicio eliminado correctamente',
        'success',
        HttpStatus.OK,
        idEquipo,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al eliminar el equipo de servicio',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }
}
