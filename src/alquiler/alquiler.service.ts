import { BadRequestException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlquilerEntity } from './alquiler.entity';
import { Repository } from 'typeorm';
import { MessageDto } from 'src/common/message.dto';
import { CreateAlquilerDto } from './dto/create-alquiler.dto';
import { UpdateAlquilerDto } from './dto/update-alquiler.dto';

@Injectable()
export class AlquilerService {
  constructor(
    @InjectRepository(AlquilerEntity)
    private readonly alquilerRepository: Repository<AlquilerEntity>,
  ) {}

  // ======= Listar todos los alquileres
  async getList(): Promise<AlquilerEntity[]> {
    try {
      return await this.alquilerRepository.find({ where: { estado: true } });
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al obtener la lista de alquileres',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======= Obtener alquiler por ID
  async getById(idAlquiler: number): Promise<AlquilerEntity> {
    try {
      const alquiler = await this.alquilerRepository.findOne({
        where: { idAlquiler, estado: true },
      });

      if (!alquiler) {
        throw new BadRequestException(
          new MessageDto(
            'Alquiler no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      return alquiler;
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al obtener el alquiler',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======== Crear un nuevo alquiler
  async create(createAlquilerDto: CreateAlquilerDto): Promise<MessageDto> {
    try {
      const alquiler = this.alquilerRepository.create(createAlquilerDto);
      const savedAlquiler = await this.alquilerRepository.save(alquiler);

      return new MessageDto(
        'Alquiler registrado correctamente',
        'success',
        HttpStatus.CREATED,
        savedAlquiler.idAlquiler,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al registrar el alquiler',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======== Actualizar un alquiler existente
  async update(
    idAlquiler: number,
    updateAlquilerDto: UpdateAlquilerDto,
  ): Promise<MessageDto> {
    try {
      const alquiler = await this.alquilerRepository.findOne({
        where: { idAlquiler },
      });

      if (!alquiler) {
        throw new BadRequestException(
          new MessageDto(
            'Alquiler no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      await this.alquilerRepository.update(idAlquiler, updateAlquilerDto);

      return new MessageDto(
        'Alquiler actualizado correctamente',
        'success',
        HttpStatus.OK,
        idAlquiler,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al actualizar el alquiler',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======== Eliminar un alquiler (cambio de estado en lugar de borrado físico)
  async delete(idAlquiler: number): Promise<MessageDto> {
    try {
      const alquiler = await this.alquilerRepository.findOne({
        where: { idAlquiler },
      });

      if (!alquiler) {
        throw new BadRequestException(
          new MessageDto(
            'Alquiler no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      await this.alquilerRepository.update(idAlquiler, { estado: false });

      return new MessageDto(
        'Alquiler eliminado correctamente',
        'success',
        HttpStatus.OK,
        idAlquiler,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al eliminar el alquiler',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }
}
