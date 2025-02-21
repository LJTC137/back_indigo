import { BadRequestException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdornoXAlquilerEntity } from './adorno_x_alquiler.entity';
import { Repository } from 'typeorm';
import { MessageDto } from 'src/common/message.dto';
import { CreateAdornoXAlquilerDto } from './dto/create-adorno-alquiler.dto';
import { UpdateAdornoXAlquilerDto } from './dto/update-adorno-alquiler.dto';

@Injectable()
export class AdornoXAlquilerService {
  constructor(
    @InjectRepository(AdornoXAlquilerEntity)
    private readonly adornoXAlquilerRepository: Repository<AdornoXAlquilerEntity>,
  ) {}

  // ======= Listar todos los adornosXAlquiler
  async getList(): Promise<AdornoXAlquilerEntity[]> {
    try {
      return await this.adornoXAlquilerRepository.find();
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al obtener la lista de adornos por alquiler',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======= Listar AdornoXAlquiler por id alquiler
  async getByAlquilerId(idAlquiler: number): Promise<AdornoXAlquilerEntity[]> {
    try {
      const adornos = await this.adornoXAlquilerRepository.find({
        where: { alquiler: { idAlquiler } },
      });

      if (!adornos || adornos.length === 0) {
        throw new BadRequestException(
          new MessageDto(
            'No se encontraron adornos para este alquiler',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      return adornos;
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al obtener los adornos del alquiler',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======== Crear AdornoXAlquiler
  async create(
    createAdornoXAlquilerDto: CreateAdornoXAlquilerDto,
  ): Promise<MessageDto> {
    try {
      const adornoXAlquiler = this.adornoXAlquilerRepository.create(
        createAdornoXAlquilerDto,
      );
      const savedAdornoXAlquiler =
        await this.adornoXAlquilerRepository.save(adornoXAlquiler);

      return new MessageDto(
        'Adorno por alquiler registrado correctamente',
        'success',
        HttpStatus.CREATED,
        savedAdornoXAlquiler.idAdornoXAlquiler,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al registrar el adorno por alquiler',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======== Actualizar AdornoXAlquiler
  async update(
    idAdornoXAlquiler: number,
    updateAdornoXAlquilerDto: UpdateAdornoXAlquilerDto,
  ): Promise<MessageDto> {
    try {
      const adornoXAlquiler = await this.adornoXAlquilerRepository.findOne({
        where: { idAdornoXAlquiler },
      });

      if (!adornoXAlquiler) {
        throw new BadRequestException(
          new MessageDto(
            'Adorno por alquiler no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      await this.adornoXAlquilerRepository.update(
        idAdornoXAlquiler,
        updateAdornoXAlquilerDto,
      );

      return new MessageDto(
        'Adorno por alquiler actualizado correctamente',
        'success',
        HttpStatus.OK,
        idAdornoXAlquiler,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al actualizar el adorno por alquiler',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======== Eliminar AdornoXAlquiler
  async delete(idAdornoXAlquiler: number): Promise<MessageDto> {
    try {
      const adornoXAlquiler = await this.adornoXAlquilerRepository.findOne({
        where: { idAdornoXAlquiler },
      });

      if (!adornoXAlquiler) {
        throw new BadRequestException(
          new MessageDto(
            'Adorno por alquiler no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      await this.adornoXAlquilerRepository.delete(idAdornoXAlquiler);

      return new MessageDto(
        'Adorno por alquiler eliminado correctamente',
        'success',
        HttpStatus.OK,
        idAdornoXAlquiler,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al eliminar el adorno por alquiler',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }
}
