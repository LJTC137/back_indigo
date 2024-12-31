import { BadRequestException, Injectable } from '@nestjs/common';
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
  async getList() {
    try {
      return await this.montajeRepository.find({ where: { estado: true } });
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======= Listar montaje por id
  async getById(idMontaje: number) {
    try {
      const montaje = await this.montajeRepository.find({
        where: { idMontaje: idMontaje, estado: true },
      });
      if (!montaje) {
        throw new BadRequestException(
          new MessageDto('No sea a encontrado el montaje'),
        );
      }
      return montaje;
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======== Crear montaje
  async create(createMontajeDto: CreateMontajeDto) {
    try {
      const montaje = this.montajeRepository.create(createMontajeDto);
      await this.montajeRepository.save(montaje);
      return new MessageDto('Montaje registrado');
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======== Eliminar montaje
  async delete(idMontaje: number, updateMontajeDto: UpdateMontajeDto) {
    try {
      const montaje = await this.montajeRepository.find({
        where: { idMontaje: idMontaje },
      });
      if (!montaje) {
        throw new BadRequestException(new MessageDto('Montaje no encontrado'));
      }
      updateMontajeDto.estado = false;
      await this.montajeRepository.update({ idMontaje }, updateMontajeDto);
      return new MessageDto('Montaje eliminado');
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======== Actualizar montaje
  async update(idMontaje: number, updateMontajeDto: UpdateMontajeDto) {
    try {
      const montaje = await this.montajeRepository.find({
        where: { idMontaje: idMontaje },
      });
      if (!montaje) {
        throw new BadRequestException(new MessageDto('Local no encontrado'));
      }
      await this.montajeRepository.update({ idMontaje }, updateMontajeDto);
      return new MessageDto('Montaje actualizado');
    } catch (error) {
      return new MessageDto(error);
    }
  }
}
