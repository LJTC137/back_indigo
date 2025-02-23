import { BadRequestException, Injectable, HttpStatus } from '@nestjs/common';
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

  // ======== Listar todos los catálogos
  async getList(): Promise<CatalogoEntity[]> {
    try {
      return await this.catalogoRepository.find({
        where: { estado: true },
        order: { nombreCatalogo: 'ASC' }, // Orden ascendente
      });
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al obtener la lista de catálogos',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======== Obtener catálogo por ID
  async getById(idCatalogo: number): Promise<CatalogoEntity> {
    try {
      const catalogo = await this.catalogoRepository.findOne({
        where: { idCatalogo, estado: true },
      });

      if (!catalogo) {
        throw new BadRequestException(
          new MessageDto(
            'Catálogo no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      return catalogo;
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al obtener el catálogo',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======== Crear un nuevo catálogo
  async create(createCatalogoDto: CreateCatalogoDto): Promise<MessageDto> {
    try {
      const catalogo = this.catalogoRepository.create(createCatalogoDto);
      const savedCatalogo = await this.catalogoRepository.save(catalogo);

      return new MessageDto(
        'Catálogo registrado con éxito',
        'success',
        HttpStatus.CREATED,
        savedCatalogo.idCatalogo,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al registrar el catálogo',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======== Actualizar un catálogo existente
  async update(
    idCatalogo: number,
    updateCatalogoDto: UpdateCatalogoDto,
  ): Promise<MessageDto> {
    try {
      const catalogo = await this.catalogoRepository.findOne({
        where: { idCatalogo },
      });

      if (!catalogo) {
        throw new BadRequestException(
          new MessageDto(
            'Catálogo no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      await this.catalogoRepository.update(idCatalogo, updateCatalogoDto);

      return new MessageDto(
        'Catálogo actualizado correctamente',
        'success',
        HttpStatus.OK,
        idCatalogo,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al actualizar el catálogo',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======== Eliminar un catálogo (cambio de estado en lugar de borrado físico)
  async delete(idCatalogo: number): Promise<MessageDto> {
    try {
      const catalogo = await this.catalogoRepository.findOne({
        where: { idCatalogo },
      });

      if (!catalogo) {
        throw new BadRequestException(
          new MessageDto(
            'Catálogo no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      await this.catalogoRepository.update(idCatalogo, { estado: false });

      return new MessageDto(
        'Catálogo eliminado correctamente',
        'success',
        HttpStatus.OK,
        idCatalogo,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al eliminar el catálogo',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }
}
