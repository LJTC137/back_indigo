import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdornoEntity } from './adorno.entity';
import { Repository } from 'typeorm';
import { MessageDto } from 'src/common/message.dto';
import { CreateAdornoDto } from './dto/create-adorno.dto';
import { UpdateAdornoDto } from './dto/update-adorno.dto';

@Injectable()
export class AdornoService {
  constructor(
    @InjectRepository(AdornoEntity)
    private readonly adornoRepository: Repository<AdornoEntity>,
  ) {}

  // ======= Listar todos los adornos
  async getList() {
    try {
      return await this.adornoRepository.find({ where: { estado: true } });
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======= Listar adorno por id
  async getById(idAdorno: number) {
    try {
      const adorno = await this.adornoRepository.find({
        where: { idAdorno: idAdorno, estado: true },
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

  // ======== Crear adorno
  async create(createAdornoDto: CreateAdornoDto) {
    try {
      const adorno = this.adornoRepository.create(createAdornoDto);
      await this.adornoRepository.save(adorno);
      return new MessageDto('Adorno registrado correctamente');
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======== Eliminar adorno
  async delete(idAdorno: number, updateAdornoDto: UpdateAdornoDto) {
    try {
      const adorno = await this.adornoRepository.find({
        where: { idAdorno: idAdorno },
      });
      if (!adorno) {
        throw new BadRequestException(new MessageDto('Adorno no encontrado'));
      }
      updateAdornoDto.estado = false;
      await this.adornoRepository.update({ idAdorno }, updateAdornoDto);
      return new MessageDto('Adorno eliminado');
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======== Actualizar adorno
  async update(idAdorno: number, updateAdorno: UpdateAdornoDto) {
    try {
      const adorno = await this.adornoRepository.find({
        where: { idAdorno: idAdorno },
      });
      if (!adorno) {
        throw new BadRequestException(new MessageDto('Adorno no encontrado'));
      }
      await this.adornoRepository.update({ idAdorno }, updateAdorno);
      return new MessageDto('Adorno actualizado');
    } catch (error) {
      return new MessageDto(error);
    }
  }
}
