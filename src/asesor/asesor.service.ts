import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AsesorEntity } from './asesor.entity';
import { MessageDto } from 'src/common/message.dto';
import { CreateAsesorDto } from './dto/create-asesor.dto';
import { UpdateAsesorDto } from 'src/asesor/dto/update-asesor.dto';

@Injectable()
export class AsesorService {
  constructor(
    @InjectRepository(AsesorEntity)
    private readonly asesorRepository: Repository<AsesorEntity>,
  ) {}

  // ======= Listar todos los asesores
  async getList() {
    try {
      return await this.asesorRepository.find({ where: { estado: true } });
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======= Listar asesor por id
  async getById(idAsesor: number) {
    try {
      const asesor = await this.asesorRepository.find({
        where: { idAsesor: idAsesor, estado: true },
      });
      if (!asesor) {
        throw new BadRequestException(
          new MessageDto('No sea a encontrado el asesor'),
        );
      }
      return asesor;
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======== Crear asesor
  async create(createAsesorDto: CreateAsesorDto) {
    try {
      const asesor = this.asesorRepository.create(createAsesorDto);
      await this.asesorRepository.save(asesor);
      return new MessageDto('Asesor registrado');
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======== Eliminar asesor
  async delete(idAsesor: number, updateAsesorDto: UpdateAsesorDto) {
    try {
      const asesor = await this.asesorRepository.find({
        where: { idAsesor: idAsesor },
      });
      if (!asesor) {
        throw new BadRequestException(new MessageDto('Asesor no encontrado'));
      }
      updateAsesorDto.estado = false;
      await this.asesorRepository.update({ idAsesor }, updateAsesorDto);
      return new MessageDto('Asesor eliminado');
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======== Actualizar asesor
  async update(idAsesor: number, updateAsesorDto: UpdateAsesorDto) {
    try {
      const asesor = await this.asesorRepository.find({
        where: { idAsesor: idAsesor },
      });
      if (!asesor) {
        throw new BadRequestException(new MessageDto('Asesor no encontrado'));
      }
      await this.asesorRepository.update({ idAsesor }, updateAsesorDto);
      return new MessageDto('Asesor actualizado');
    } catch (error) {
      return new MessageDto(error);
    }
  }
}
