import { BadRequestException, Injectable } from '@nestjs/common';
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
  async getList() {
    try {
      return await this.adornoXAlquilerRepository.find();
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======= Listar AdornoXAlquiler por id alquiler
  async getByAlquilerId(idAlquiler: number) {
    try {
      const adornoXAlquiler = await this.adornoXAlquilerRepository.find({
        where: { alquiler: { idAlquiler: idAlquiler } },
      });
      if (!adornoXAlquiler) {
        throw new BadRequestException(
          new MessageDto('No sea a encontrado el adorno'),
        );
      }
      return adornoXAlquiler;
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======== Crear AdornoXAlquiler
  async create(
    createAdornoXAlquilerDto: CreateAdornoXAlquilerDto,
  ) {
    try {
      const adornoXAlquiler = this.adornoXAlquilerRepository.create(
        createAdornoXAlquilerDto,
      );
      return await this.adornoXAlquilerRepository.save(adornoXAlquiler);
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======== Eliminar adornoXAlquiler
  async delete(idAdornoXAlquiler: number) {
    try {
      const adornoXAlquiler = await this.adornoXAlquilerRepository.find({
        where: { idAdornoXAlquiler: idAdornoXAlquiler },
      });
      if (!adornoXAlquiler) {
        throw new BadRequestException(new MessageDto('Adorno no encontrado'));
      }
      await this.adornoXAlquilerRepository.delete({ idAdornoXAlquiler });
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======== Actualizar adornoXAlquiler
  async update(
    idAdornoXAlquiler: number,
    updateAdornoXAlquiler: UpdateAdornoXAlquilerDto,
  ) {
    try {
      const adornoXAlquiler = await this.adornoXAlquilerRepository.find({
        where: { idAdornoXAlquiler: idAdornoXAlquiler },
      });
      if (!adornoXAlquiler) {
        throw new BadRequestException(new MessageDto('Adorno no encontrado'));
      }
      await this.adornoXAlquilerRepository.update(
        { idAdornoXAlquiler },
        updateAdornoXAlquiler,
      );
      return new MessageDto('Adorno actualizado');
    } catch (error) {
      return new MessageDto(error);
    }
  }
}
