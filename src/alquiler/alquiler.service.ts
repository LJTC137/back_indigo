import { BadRequestException, Injectable } from '@nestjs/common';
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

  // ======= Listar todos los alquiler
  async getList() {
    try {
      return await this.alquilerRepository.find({ where: { estado: true } });
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======= Listar alquiler por id
  async getById(idAlquiler: number) {
    try {
      const adorno = await this.alquilerRepository.find({
        where: { idAlquiler: idAlquiler, estado: true },
      });
      if (!adorno) {
        throw new BadRequestException(
          new MessageDto('No sea a encontrado el adorno'),
        );
      }
      return adorno;
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======== Crear alquiler
  async create(createAlquilerDto: CreateAlquilerDto) {
    try {
      const alquiler = this.alquilerRepository.create(createAlquilerDto);
      return await this.alquilerRepository.save(alquiler);
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======== Eliminar alquiker
  async delete(idAlquiler: number, updateAlquilerDto: UpdateAlquilerDto) {
    try {
      const alquiler = await this.alquilerRepository.find({
        where: { idAlquiler: idAlquiler },
      });
      if (!alquiler) {
        throw new BadRequestException(new MessageDto('Alquiler no encontrado'));
      }
      updateAlquilerDto.estado = false;
      await this.alquilerRepository.update({ idAlquiler }, updateAlquilerDto);
      return new MessageDto('Alquiler eliminado');
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======== Actualizar alquiler
  async update(idAlquiler: number, updateAlquiler: UpdateAlquilerDto) {
    try {
      const alquiler = await this.alquilerRepository.find({
        where: { idAlquiler: idAlquiler },
      });
      if (!alquiler) {
        throw new BadRequestException(new MessageDto('Alquiler no encontrado'));
      }
      await this.alquilerRepository.update({ idAlquiler }, updateAlquiler);
      return new MessageDto('Alquiler actualizado');
    } catch (error) {
      return new MessageDto(error);
    }
  }
}
