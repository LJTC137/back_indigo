import { BadRequestException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlquilerXEquipoEntity } from './alquiler_x_equipo.entity';
import { Repository } from 'typeorm';
import { MessageDto } from 'src/common/message.dto';
import { CreateAlquilerXEquipoDto } from './dto/create-alquiler-equipo.dto';
import { UpdateAlquilerXEquipoDto } from './dto/update-alquiler-equipo.dto';

@Injectable()
export class AlquilerXEquipoService {
  constructor(
    @InjectRepository(AlquilerXEquipoEntity)
    private readonly alquilerXEquipoRepository: Repository<AlquilerXEquipoEntity>,
  ) {}

  // ======= Listar todos los alquilerXEquipo
  async getList(): Promise<AlquilerXEquipoEntity[]> {
    try {
      return await this.alquilerXEquipoRepository.find();
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

  // ======= Listar alquilerXEquipo por id de alquiler
  async getByAlquilerId(idReserva: number): Promise<AlquilerXEquipoEntity[]> {
    try {
      const equipos = await this.alquilerXEquipoRepository.find({
        where: { reserva: { idReserva } },
      });

      if (!equipos || equipos.length === 0) {
        throw new BadRequestException(
          new MessageDto(
            'No se encontraron equipos de servicio para este alquiler',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      return equipos;
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al obtener los equipos de servicio',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======== Crear alquilerXEquipo
  async create(
    createAlquilerXEquipoDto: CreateAlquilerXEquipoDto,
  ): Promise<MessageDto> {
    try {
      const alquilerXEquipo = this.alquilerXEquipoRepository.create(
        createAlquilerXEquipoDto,
      );
      const savedAlquilerXEquipo =
        await this.alquilerXEquipoRepository.save(alquilerXEquipo);

      return new MessageDto(
        'Equipo de servicio registrado correctamente',
        'success',
        HttpStatus.CREATED,
        savedAlquilerXEquipo.idReservaXEquipo,
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

  // ======== Actualizar alquilerXEquipo
  async update(
    idReservaXEquipo: number,
    updateAlquilerXEquipoDto: UpdateAlquilerXEquipoDto,
  ): Promise<MessageDto> {
    try {
      const alquilerXEquipo = await this.alquilerXEquipoRepository.findOne({
        where: { idReservaXEquipo },
      });

      if (!alquilerXEquipo) {
        throw new BadRequestException(
          new MessageDto(
            'Equipo de servicio no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      await this.alquilerXEquipoRepository.update(
        idReservaXEquipo,
        updateAlquilerXEquipoDto,
      );

      return new MessageDto(
        'Equipo de servicio actualizado correctamente',
        'success',
        HttpStatus.OK,
        idReservaXEquipo,
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

  // ======== Eliminar alquilerXEquipo
  async delete(idReservaXEquipo: number): Promise<MessageDto> {
    try {
      const alquilerXEquipo = await this.alquilerXEquipoRepository.findOne({
        where: { idReservaXEquipo },
      });

      if (!alquilerXEquipo) {
        throw new BadRequestException(
          new MessageDto(
            'Equipo de servicio no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      await this.alquilerXEquipoRepository.delete(idReservaXEquipo);

      return new MessageDto(
        'Equipo de servicio eliminado correctamente',
        'success',
        HttpStatus.OK,
        idReservaXEquipo,
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
