import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatalogoEntity } from './catalogo.entity';
import { Repository } from 'typeorm';
import { MessageDto } from 'src/common/message.dto';
import { CreateCatalogoDto } from './dto/create-catalogo.dto';
import { UpdateCatalogoDto } from './dto/update-catalogo.dto';

@Injectable()
export class CatalogoService {
  constructor(
    @InjectRepository(CatalogoEntity)
    private readonly catalogoRepository: Repository<CatalogoEntity>,
  ) {}

  // ======== Listar catalogos
  async getList() {
    try {
      return await this.catalogoRepository.find({ where: { estado: true } });
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======== Listar catalogos
  async getById(idCatalogo: number) {
    try {
      const catalogo = await this.catalogoRepository.find({
        where: { idCatalogo: idCatalogo },
      });
      if (!catalogo) {
        throw new BadRequestException(new MessageDto('Catalogo no encontrado'));
      }
      return catalogo;
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======== Crear catalogo
  async create(createCatalogoDto: CreateCatalogoDto) {
    try {
      const catalogo = this.catalogoRepository.create(createCatalogoDto);
      if (!catalogo) {
        throw new BadRequestException(
          new MessageDto('Error al crear catalogo'),
        );
      } else {
        await this.catalogoRepository.save(catalogo);
        return new MessageDto('Catalogo registrado');
      }
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======== Eliminar catalogo
  async delete(idCatalogo: number, updateCatalogoDto: UpdateCatalogoDto) {
    try {
      const catalogo = await this.catalogoRepository.find({
        where: { idCatalogo: idCatalogo },
      });
      if (!catalogo) {
        throw new BadRequestException(new MessageDto('Catalogo no encontrado'));
      }
      updateCatalogoDto.estado = false;
      await this.catalogoRepository.update({ idCatalogo }, updateCatalogoDto);
      return new MessageDto('Catalogo eliminado');
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======== Actualizar catalogo
  async update(idCatalogo: number, updateCatalogoDto: UpdateCatalogoDto) {
    try {
      const catalogo = await this.catalogoRepository.find({
        where: { idCatalogo: idCatalogo },
      });
      if (!catalogo) {
        throw new BadRequestException(new MessageDto('Catalogo no encontrado'));
      }
      await this.catalogoRepository.update({ idCatalogo }, updateCatalogoDto);
      return new MessageDto('Catalogo actualizado');
    } catch (error) {
      return new MessageDto(error);
    }
  }
}
