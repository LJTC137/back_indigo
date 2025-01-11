import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EquipoServicioEntity } from './equipo_servicio.entity';
import { Repository } from 'typeorm';
import { MessageDto } from 'src/common/message.dto';
import { CreateEquipoServicioDto } from './dto/create-equipo-servicio.dto';
import { UpdateEquipoServicioDto } from './dto/update-equipo-servicio.dto';

@Injectable()
export class EquipoServicioService {
  constructor(
    @InjectRepository(EquipoServicioEntity)
    private readonly equipoRepository: Repository<EquipoServicioEntity>,
  ) {}

  // ======= Listar todos los equipos
  async getList() {
    try {
      return await this.equipoRepository.find({ where: { estado: true } });
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======= Listar equipo por id
  async getById(idEquipo: number) {
    try {
      const equipo = await this.equipoRepository.find({
        where: { idEquipo: idEquipo, estado: true },
      });
      if (!equipo) {
        throw new BadRequestException(
          new MessageDto('No sea a encontrado el equipo'),
        );
      }
      return equipo;
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======== Crear equipo
  async create(createEquipoServicioDto: CreateEquipoServicioDto) {
    try {
      const equipo = this.equipoRepository.create(createEquipoServicioDto);
      await this.equipoRepository.save(equipo);
      return new MessageDto('Equipo de servicio registrado');
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======== Eliminar equipo
  async delete(idEquipo: number, updateEquipoDto: UpdateEquipoServicioDto) {
    try {
      const equipo = await this.equipoRepository.find({
        where: { idEquipo: idEquipo },
      });
      if (!equipo) {
        throw new BadRequestException(
          new MessageDto('Equipo de servicio no encontrado'),
        );
      }
      updateEquipoDto.estado = false;
      await this.equipoRepository.update({ idEquipo }, updateEquipoDto);
      return new MessageDto('Equipo de servicio eliminado');
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======== Actualizar equipo
  async update(idEquipo: number, updateEquipoDto: UpdateEquipoServicioDto) {
    try {
      const equipo = await this.equipoRepository.find({
        where: { idEquipo: idEquipo },
      });
      if (!equipo) {
        throw new BadRequestException(
          new MessageDto('Equipo de servicio no encontrado'),
        );
      }
      await this.equipoRepository.update({ idEquipo }, updateEquipoDto);
      return new MessageDto('Equipo de servicio actualizado');
    } catch (error) {
      return new MessageDto(error);
    }
  }
}
