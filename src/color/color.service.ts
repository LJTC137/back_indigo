import { BadRequestException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColorEntity } from './color.entity';
import { Repository } from 'typeorm';
import { MessageDto } from 'src/common/message.dto';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(ColorEntity)
    private readonly colorRepository: Repository<ColorEntity>,
  ) {}

  // ======== Listar todos los colores
  async getList(): Promise<ColorEntity[]> {
    try {
      return await this.colorRepository.find({ where: { estado: true } });
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al obtener la lista de colores',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======== Obtener color por ID
  async getById(idColor: number): Promise<ColorEntity> {
    try {
      const color = await this.colorRepository.findOne({
        where: { idColor, estado: true },
      });

      if (!color) {
        throw new BadRequestException(
          new MessageDto(
            'Color no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      return color;
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al obtener el color',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======== Crear un nuevo color
  async create(createColorDto: CreateColorDto): Promise<MessageDto> {
    try {
      const color = this.colorRepository.create(createColorDto);
      const savedColor = await this.colorRepository.save(color);

      return new MessageDto(
        'Color registrado con éxito',
        'success',
        HttpStatus.CREATED,
        savedColor.idColor,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al registrar el color',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======== Actualizar un color existente
  async update(
    idColor: number,
    updateColorDto: UpdateColorDto,
  ): Promise<MessageDto> {
    try {
      const color = await this.colorRepository.findOne({ where: { idColor } });

      if (!color) {
        throw new BadRequestException(
          new MessageDto(
            'Color no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      await this.colorRepository.update(idColor, updateColorDto);

      return new MessageDto(
        'Color actualizado correctamente',
        'success',
        HttpStatus.OK,
        idColor,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al actualizar el color',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======== Eliminar un color (cambio de estado en lugar de borrado físico)
  async delete(idColor: number): Promise<MessageDto> {
    try {
      const color = await this.colorRepository.findOne({ where: { idColor } });

      if (!color) {
        throw new BadRequestException(
          new MessageDto(
            'Color no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      await this.colorRepository.update(idColor, { estado: false });

      return new MessageDto(
        'Color eliminado correctamente',
        'success',
        HttpStatus.OK,
        idColor,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al eliminar el color',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }
}
