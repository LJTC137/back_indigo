import { BadRequestException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MontajeEntity } from './montaje.entity';
import { Repository } from 'typeorm';
import { MessageDto } from 'src/common/message.dto';
import { CreateMontajeDto } from './dto/create-montaje.dto';
import { UpdateMontajeDto } from './dto/update-montaje.dto';

@Injectable()
export class MontajeService {
  constructor(
    @InjectRepository(MontajeEntity)
    private readonly montajeRepository: Repository<MontajeEntity>,
  ) {}

  // ======= Listar todos los montajes
  async getList(): Promise<MontajeEntity[]> {
    try {
      return await this.montajeRepository.find({
        where: { estado: true },
        relations: ['tipoCobro', 'tipoMontaje'],
      });
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al obtener la lista de montajes',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======= Obtener montaje por ID
  async getById(idMontaje: number): Promise<MontajeEntity> {
    try {
      const montaje = await this.montajeRepository.findOne({
        where: { idMontaje, estado: true },
        relations: ['tipoCobro', 'tipoMontaje'],
      });

      if (!montaje) {
        throw new BadRequestException(
          new MessageDto(
            'Montaje no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      return montaje;
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al obtener el montaje',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======== Crear un nuevo montaje
  async create(createMontajeDto: CreateMontajeDto): Promise<MessageDto> {
    try {
      const montaje = this.montajeRepository.create(createMontajeDto);
      const savedMontaje = await this.montajeRepository.save(montaje);

      return new MessageDto(
        'Montaje registrado correctamente',
        'success',
        HttpStatus.CREATED,
        savedMontaje.idMontaje,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al registrar el montaje',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======== Actualizar un montaje existente
  async update(
    idMontaje: number,
    updateMontajeDto: UpdateMontajeDto,
  ): Promise<MessageDto> {
    try {
      const montaje = await this.montajeRepository.findOne({
        where: { idMontaje },
      });

      if (!montaje) {
        throw new BadRequestException(
          new MessageDto(
            'Montaje no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      await this.montajeRepository.update(idMontaje, updateMontajeDto);

      return new MessageDto(
        'Montaje actualizado correctamente',
        'success',
        HttpStatus.OK,
        idMontaje,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al actualizar el montaje',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======== Eliminar un montaje (cambio de estado en lugar de borrado físico)
  async delete(idMontaje: number): Promise<MessageDto> {
    try {
      const montaje = await this.montajeRepository.findOne({
        where: { idMontaje },
      });

      if (!montaje) {
        throw new BadRequestException(
          new MessageDto(
            'Montaje no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      await this.montajeRepository.update(idMontaje, { estado: false });

      return new MessageDto(
        'Montaje eliminado correctamente',
        'success',
        HttpStatus.OK,
        idMontaje,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al eliminar el montaje',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }
}
