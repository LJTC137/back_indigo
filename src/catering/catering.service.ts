import { BadRequestException, Injectable } from '@nestjs/common';
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
    async getList() {
      try {
        return await this.cateringRepository.find({ where: { estado: true } });
      } catch (error) {
        return new MessageDto(error);
      }
    }
  
    // ======= Listar Catering por id
    async getById(idCatering: number) {
      try {
        const catering = await this.cateringRepository.find({
          where: { idCatering: idCatering, estado: true },
        });
        if (!catering) {
          throw new BadRequestException(
            new MessageDto('No sea a encontrado el catering'),
          );
        }
        return catering;
      } catch (error) {
        return new MessageDto(error);
      }
    }
  
    // ======== Crear catering
    async create(createCateringDto: CreateCateringDto) {
      try {
        const catering = this.cateringRepository.create(createCateringDto);
        await this.cateringRepository.save(catering);
        return new MessageDto('Catering registrado');
      } catch (error) {
        return new MessageDto(error);
      }
    }
  
    // ======== Eliminar catering
    async delete(idCatering: number, updateCateringDto: UpdateCateringDto) {
      try {
        const catering = await this.cateringRepository.find({
          where: { idCatering: idCatering },
        });
        if (!catering) {
          throw new BadRequestException(new MessageDto('Catering no encontrado'));
        }
        updateCateringDto.estado = false;
        await this.cateringRepository.update({ idCatering }, updateCateringDto);
        return new MessageDto('Catering eliminado');
      } catch (error) {
        return new MessageDto(error);
      }
    }
  
    // ======== Actualizar catering
    async update(idCatering: number, updateCateringDto: UpdateCateringDto) {
      try {
        const catering = await this.cateringRepository.find({
          where: { idCatering: idCatering },
        });
        if (!catering) {
          throw new BadRequestException(new MessageDto('Catering no encontrado'));
        }
        await this.cateringRepository.update({ idCatering }, updateCateringDto);
        return new MessageDto('Catering actualizado');
      } catch (error) {
        return new MessageDto(error);
      }
    }
}
