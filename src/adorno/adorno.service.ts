import { BadRequestException, Injectable, HttpStatus } from '@nestjs/common';
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
  async getList(): Promise<AdornoEntity[]> {
    try {
      return await this.adornoRepository.find({
        where: { estado: true },
        relations: ['tipoAdorno', 'adornoColor'],
      });
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al obtener la lista de adornos',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======= Obtener adorno por ID
  async getById(idAdorno: number): Promise<AdornoEntity> {
    try {
      const adorno = await this.adornoRepository.findOne({
        where: { idAdorno, estado: true },
        relations: ['tipoAdorno', 'adornoColor'],
      });

      if (!adorno) {
        throw new BadRequestException(
          new MessageDto(
            'Adorno no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      return adorno;
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al obtener el adorno',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======= Crear un nuevo adorno
  async create(createAdornoDto: CreateAdornoDto): Promise<MessageDto> {
    try {
      const tipoAdorno = await this.catalogoRepository.findOne({
        where: { idCatalogo: createAdornoDto.tipoAdorno.idCatalogo },
      });

      if (!tipoAdorno) {
        throw new BadRequestException(
          new MessageDto(
            'El tipo de adorno no existe',
            'error',
            HttpStatus.BAD_REQUEST,
            0,
          ),
        );
      }

      let colores: ColorEntity[] = [];
      if (
        createAdornoDto.adornoColor &&
        createAdornoDto.adornoColor.length > 0
      ) {
        colores = await this.colorRepository.find({
          where: { idColor: In(createAdornoDto.adornoColor) },
        });

        if (colores.length !== createAdornoDto.adornoColor.length) {
          throw new BadRequestException(
            new MessageDto(
              'Uno o más colores no existen',
              'error',
              HttpStatus.BAD_REQUEST,
              0,
            ),
          );
        }
      }

      const adorno = this.adornoRepository.create({
        ...createAdornoDto,
        tipoAdorno,
        adornoColor: colores,
      });

      const savedAdorno = await this.adornoRepository.save(adorno);

      return new MessageDto(
        'Adorno registrado correctamente',
        'success',
        HttpStatus.CREATED,
        savedAdorno.idAdorno,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al registrar el adorno',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======= Actualizar un adorno existente
  async update(
    idAdorno: number,
    updateAdornoDto: UpdateAdornoDto,
  ): Promise<MessageDto> {
    try {
      let adorno = await this.adornoRepository.findOne({
        where: { idAdorno },
        relations: ['adornoColor'],
      });

      if (!adorno) {
        throw new BadRequestException(
          new MessageDto(
            'Adorno no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      // Si hay un nuevo tipo de adorno, validamos y lo actualizamos
      if (updateAdornoDto.tipoAdorno) {
        const tipoAdornoEntity = await this.catalogoRepository.findOne({
          where: { idCatalogo: updateAdornoDto.tipoAdorno.idCatalogo },
        });

        if (!tipoAdornoEntity) {
          throw new BadRequestException(
            new MessageDto(
              'Tipo de adorno no válido',
              'error',
              HttpStatus.BAD_REQUEST,
              0,
            ),
          );
        }

        adorno.tipoAdorno = tipoAdornoEntity;
      }

      // Si hay nuevos colores, validamos y los actualizamos
      if (
        updateAdornoDto.adornoColor &&
        updateAdornoDto.adornoColor.length > 0
      ) {
        const coloresRelacionados = await this.colorRepository.find({
          where: {
            idColor: In(
              updateAdornoDto.adornoColor.map((color) => color.idColor),
            ),
          },
        });

        if (coloresRelacionados.length !== updateAdornoDto.adornoColor.length) {
          throw new BadRequestException(
            new MessageDto(
              'Uno o más colores no existen',
              'error',
              HttpStatus.BAD_REQUEST,
              0,
            ),
          );
        }

        adorno.adornoColor = coloresRelacionados;
      }

      // Actualizamos los demás datos del adorno
      await this.adornoRepository.update(idAdorno, updateAdornoDto);
      await this.adornoRepository.save(adorno);

      return new MessageDto(
        'Adorno actualizado correctamente',
        'success',
        HttpStatus.OK,
        idAdorno,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al actualizar el adorno',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======== Eliminar un adorno (cambio de estado en lugar de borrado físico)
  async delete(idAdorno: number): Promise<MessageDto> {
    try {
      const adorno = await this.adornoRepository.findOne({
        where: { idAdorno },
      });

      if (!adorno) {
        throw new BadRequestException(
          new MessageDto(
            'Adorno no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      await this.adornoRepository.update(idAdorno, { estado: false });

      return new MessageDto(
        'Adorno eliminado correctamente',
        'success',
        HttpStatus.OK,
        idAdorno,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al eliminar el adorno',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }
}
