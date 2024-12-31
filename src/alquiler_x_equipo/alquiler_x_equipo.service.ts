import { BadRequestException, Injectable } from '@nestjs/common';
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
  async getList() {
    try {
      return await this.alquilerXEquipoRepository.find();
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======= Listar alquilerXEquipo por id alquiler
  async getByAlquilerId(idAlquiler: number) {
    try {
      const alquilerXEquipo = await this.alquilerXEquipoRepository.find({
        where: { alquiler: { idAlquiler: idAlquiler } },
      });
      if (!alquilerXEquipo) {
        throw new BadRequestException(
          new MessageDto('No sea a encontrado el equipo de servicio'),
        );
      }
      return alquilerXEquipo;
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======== Crear alquilerXEquipo
  async create(
    createAlquilerXEquipoDto: CreateAlquilerXEquipoDto,
  ) {
    try {
      const alquilerXEquipo = this.alquilerXEquipoRepository.create(
        createAlquilerXEquipoDto,
      );
      return await this.alquilerXEquipoRepository.save(alquilerXEquipo);
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======== Eliminar alquilerXEquipo
  async delete(idAlquilerXEquipo: number) {
    try {
      const alquilerXEquipo = await this.alquilerXEquipoRepository.find({
        where: { idAlquilerXEquipo: idAlquilerXEquipo },
      });
      if (!alquilerXEquipo) {
        throw new BadRequestException(
          new MessageDto('Equipo de servicio no encontrado'),
        );
      }
      await this.alquilerXEquipoRepository.delete({ idAlquilerXEquipo });
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======== Actualizar alquilerXEquipo
  async update(
    idAlquilerXEquipo: number,
    updateAlquilerXEquipo: UpdateAlquilerXEquipoDto,
  ) {
    try {
      const alquilerXEquipo = await this.alquilerXEquipoRepository.find({
        where: { idAlquilerXEquipo: idAlquilerXEquipo },
      });
      if (!alquilerXEquipo) {
        throw new BadRequestException(
          new MessageDto('Equipo de servicio no encontrado'),
        );
      }
      await this.alquilerXEquipoRepository.update(
        { idAlquilerXEquipo },
        updateAlquilerXEquipo,
      );
      return new MessageDto('Equipo de servicio actualizado');
    } catch (error) {
      return new MessageDto(error);
    }
  }
}
