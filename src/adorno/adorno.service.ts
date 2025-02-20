import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdornoEntity } from './adorno.entity';
import { In, Repository } from 'typeorm';
import { MessageDto } from 'src/common/message.dto';
import { CreateAdornoDto } from './dto/create-adorno.dto';
import { UpdateAdornoDto } from './dto/update-adorno.dto';
import { ColorEntity } from 'src/color/color.entity';
import { CatalogoEntity } from 'src/catalogo/catalogo.entity';

@Injectable()
export class AdornoService {
  constructor(
    @InjectRepository(AdornoEntity)
    private readonly adornoRepository: Repository<AdornoEntity>,

    @InjectRepository(ColorEntity)
    private readonly colorRepository: Repository<ColorEntity>,

    @InjectRepository(CatalogoEntity)
    private readonly catalogoRepository: Repository<CatalogoEntity>,
  ) {}

  // ======= Listar todos los adornos
  async getList() {
    try {
      return await this.adornoRepository.find({
        where: { estado: true },
        relations: ['tipoAdorno', 'adornoColor'],
      });
    } catch (error) {
      return new MessageDto(error.message || 'Error al obtener la lista');
    }
  }

  // ======= Obtener adorno por ID
  async getById(idAdorno: number) {
    try {
      const adorno = await this.adornoRepository.findOne({
        where: { idAdorno: idAdorno, estado: true },
        relations: ['tipoAdorno', 'adornoColor'],
      });
      if (!adorno) {
        throw new BadRequestException(new MessageDto('Adorno no encontrado'));
      }
      return adorno;
    } catch (error) {
      return new MessageDto(error.message || 'Error al obtener el adorno');
    }
  }

  async create(createAdornoDto: CreateAdornoDto) {
    try {
      const tipoAdorno = await this.catalogoRepository.findOne({
        where: { idCatalogo: createAdornoDto.tipoAdorno.idCatalogo },
      });

      if (!tipoAdorno) {
        throw new BadRequestException('El tipo de adorno no existe');
      }

      let colores: ColorEntity[] = [];
      if (
        Array.isArray(createAdornoDto.adornoColor) &&
        createAdornoDto.adornoColor.length > 0
      ) {
        colores = await this.colorRepository.findBy({
          idColor: In(createAdornoDto.adornoColor),
        });

        if (colores.length !== createAdornoDto.adornoColor.length) {
          throw new BadRequestException('Uno o más colores no existen');
        }
      }

      const adorno = this.adornoRepository.create({
        descripcion: createAdornoDto.descripcion,
        nombre: createAdornoDto.nombre,
        estado: createAdornoDto.estado,
        dimensiones: createAdornoDto.dimensiones,
        precioUnitario: createAdornoDto.precioUnitario,
        cantidad: createAdornoDto.cantidad,
        tipoAdorno: tipoAdorno,
        adornoColor: colores,
      });

      await this.adornoRepository.save(adorno);

      return new MessageDto('Adorno registrado correctamente');
    } catch (error) {
      console.error(error);
      return new MessageDto(error.message || 'Error al registrar el adorno');
    }
  }

  // ======== Eliminar adorno (cambia el estado a false)
  async delete(idAdorno: number) {
    try {
      const adorno = await this.adornoRepository.findOne({
        where: { idAdorno: idAdorno },
      });

      if (!adorno) {
        throw new BadRequestException(new MessageDto('Adorno no encontrado'));
      }

      adorno.estado = false;
      await this.adornoRepository.save(adorno);

      return new MessageDto('Adorno eliminado correctamente');
    } catch (error) {
      return new MessageDto(error.message || 'Error al eliminar el adorno');
    }
  }

  async update(idAdorno: number, updateAdornoDto: UpdateAdornoDto) {
    try {
      let adorno = await this.adornoRepository.findOne({
        where: { idAdorno },
        relations: ['adornoColor'],
      });

      if (!adorno) {
        throw new BadRequestException(new MessageDto('Adorno no encontrado'));
      }

      const { adornoColor, tipoAdorno, ...adornoData } = updateAdornoDto;

      await this.adornoRepository.update(idAdorno, adornoData);

      adorno = await this.adornoRepository.findOne({
        where: { idAdorno },
        relations: ['adornoColor'],
      });

      if (tipoAdorno) {
        console.log('🔹 Actualizando tipo de adorno...');
        const tipoAdornoEntity = await this.catalogoRepository.findOne({
          where: { idCatalogo: tipoAdorno.idCatalogo },
        });

        if (!tipoAdornoEntity) {
          throw new BadRequestException(
            new MessageDto('Tipo de adorno no válido'),
          );
        }

        adorno.tipoAdorno = tipoAdornoEntity;
      }

      if (adorno.adornoColor.length > 0) {
        adorno.adornoColor = [];
        await this.adornoRepository.save(adorno);
      }

      if (adornoColor && adornoColor.length > 0) {
        const coloresRelacionados = await this.colorRepository.find({
          where: { idColor: In(adornoColor.map((color) => color.idColor)) },
        });

        if (coloresRelacionados.length !== adornoColor.length) {
          throw new BadRequestException(
            new MessageDto('Uno o más colores no existen'),
          );
        }

        adorno.adornoColor = coloresRelacionados;
      }
      await this.adornoRepository.save(adorno);

      return new MessageDto('Adorno actualizado correctamente');
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(error.message || 'Error al actualizar el adorno'),
      );
    }
  }
}
