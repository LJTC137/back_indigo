import { BadRequestException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CateringEntity } from './catering.entity';
import { Repository } from 'typeorm';
import { MessageDto } from 'src/common/message.dto';
import { CreateCateringDto } from './dto/create-catering.dto';
import { UpdateCateringDto } from './dto/update-catering.dto';

@Injectable()
export class CateringService {
  constructor(
    @InjectRepository(CateringEntity)
    private readonly cateringRepository: Repository<CateringEntity>,
  ) {}

  // ======= Listar todos los catering
  async getList(): Promise<CateringEntity[]> {
    try {
      return await this.cateringRepository.find({
        where: { estado: true },
        relations: ['tipoCatering'],
      });
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al obtener la lista de catering',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======= Listar Catering por id
  async getById(idCatering: number): Promise<CateringEntity> {
    try {
      const catering = await this.cateringRepository.findOne({
        where: { idCatering, estado: true },
        relations: ['tipoCatering'],
      });

      if (!catering) {
        throw new BadRequestException(
          new MessageDto(
            'Catering no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      return catering;
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al obtener el catering',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======== Crear catering
  async create(createCateringDto: CreateCateringDto): Promise<MessageDto> {
    try {
      const catering = this.cateringRepository.create(createCateringDto);
      const savedCatering = await this.cateringRepository.save(catering);

      return new MessageDto(
        'Catering registrado con éxito',
        'success',
        HttpStatus.CREATED,
        savedCatering.idCatering,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al registrar el catering',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======== Actualizar catering
  async update(
    idCatering: number,
    updateCateringDto: UpdateCateringDto,
  ): Promise<MessageDto> {
    try {
      const catering = await this.cateringRepository.findOne({
        where: { idCatering },
      });

      if (!catering) {
        throw new BadRequestException(
          new MessageDto(
            'Catering no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      await this.cateringRepository.update({ idCatering }, updateCateringDto);

      return new MessageDto(
        'Catering actualizado correctamente',
        'success',
        HttpStatus.OK,
        idCatering,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al actualizar el catering',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======== Eliminar catering (cambio de estado en lugar de borrado físico)
  async delete(idCatering: number): Promise<MessageDto> {
    try {
      const catering = await this.cateringRepository.findOne({
        where: { idCatering },
      });

      if (!catering) {
        throw new BadRequestException(
          new MessageDto(
            'Catering no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      await this.cateringRepository.update({ idCatering }, { estado: false });

      return new MessageDto(
        'Catering eliminado correctamente',
        'success',
        HttpStatus.OK,
        idCatering,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al eliminar el catering',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }
}
