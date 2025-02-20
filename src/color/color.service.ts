import { BadRequestException, Injectable } from '@nestjs/common';
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

  // ======== Listar colores
  async getList() {
    try {
      return await this.colorRepository.find({ where: { estado: true } });
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======== Listar colores
  async getById(idColor: number) {
    try {
      const color = await this.colorRepository.find({
        where: { idColor: idColor },
      });
      if (!color) {
        throw new BadRequestException(new MessageDto('Color no encontrado'));
      }
      return color;
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======== Crear color
  async crear(createColorDto: CreateColorDto) {
    try {
      const color = this.colorRepository.create(createColorDto);
      this.colorRepository.create(color);
      await this.colorRepository.save(color);
      return new MessageDto('Color registrado');
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======== Eliminar color
  async delete(idColor: number, updateColorDto: UpdateColorDto) {
    try {
      const color = await this.colorRepository.find({
        where: { idColor: idColor },
      });
      if (!color) {
        throw new BadRequestException(new MessageDto('Color no encontrado'));
      }
      updateColorDto.estado = false;
      await this.colorRepository.update({ idColor }, updateColorDto);
      return new MessageDto('Color eliminado');
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======== Actualizar color
  async update(idColor: number, updateColorDto: UpdateColorDto) {
    try {
      const color = await this.colorRepository.findOne({ where: { idColor } });

      if (!color) {
        throw new BadRequestException(new MessageDto('Color no encontrado'));
      }
      await this.colorRepository.update(idColor, updateColorDto);

      const colorActualizado = await this.colorRepository.findOne({
        where: { idColor },
      });

      return colorActualizado;
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(error.message || 'Error al actualizar el color'),
      );
    }
  }
}
