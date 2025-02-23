import { BadRequestException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdornoEntity } from './adorno.entity';
import { In, Repository } from 'typeorm';
import { CreateAdornoDto } from './dto/create-adorno.dto';
import { UpdateAdornoDto } from './dto/update-adorno.dto';
import { ColorEntity } from 'src/color/color.entity';
import { CatalogoEntity } from 'src/catalogo/catalogo.entity';
import { MessageDto } from 'src/common/message.dto';

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

  // ============================= Listar todos los adornos
  async getList() {
    try {
      return await this.adornoRepository.find({
        where: { estado: true },
        relations: ['tipoAdorno', 'adornoColor'],
      });
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          error.message || 'Error al obtener la lista',
          'error',
          400,
          HttpStatus.BAD_REQUEST,
        ),
      );
    }
  }

  // ======================= Obtener adorno por ID
  async getById(idAdorno: number) {
    try {
      const adorno = await this.adornoRepository.findOne({
        where: { idAdorno: idAdorno, estado: true },
        relations: ['tipoAdorno', 'adornoColor'],
      });

      if (!adorno) {
        throw new BadRequestException(
          new MessageDto(
            'Adorno no encontrado',
            'error',
            404,
            HttpStatus.NOT_FOUND,
          ),
        );
      }

      return adorno;
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          error.message || 'Error al obtener el adorno',
          'error',
          400,
          HttpStatus.BAD_REQUEST,
        ),
      );
    }
  }

  // ======================= Crear un nuevo adorno
  async create(createAdornoDto: CreateAdornoDto) {
    try {
      if (
        !createAdornoDto.tipoAdorno ||
        !createAdornoDto.tipoAdorno.idCatalogo
      ) {
        throw new BadRequestException(
          new MessageDto(
            'El tipo de adorno es obligatorio',
            'error',
            400,
            HttpStatus.BAD_REQUEST,
          ),
        );
      }

      const tipoAdorno = await this.catalogoRepository.findOne({
        where: { idCatalogo: createAdornoDto.tipoAdorno.idCatalogo },
      });

      if (!tipoAdorno) {
        throw new BadRequestException(
          new MessageDto(
            'El tipo de adorno no existe',
            'error',
            400,
            HttpStatus.BAD_REQUEST,
          ),
        );
      }

      let colores: ColorEntity[] = [];
      if (
        Array.isArray(createAdornoDto.adornoColor) &&
        createAdornoDto.adornoColor.length > 0
      ) {
        const coloresValidos = createAdornoDto.adornoColor.filter(
          (color) => color.idColor > 0 && color.nombre.trim() !== '',
        );

        const idsColores = coloresValidos.map((color) => color.idColor); // Extraer los IDs

        colores = await this.colorRepository.findBy({
          idColor: In(idsColores),
        });
        if (colores.length !== idsColores.length) {
          throw new BadRequestException(
            new MessageDto(
              'Uno o más colores no existen',
              'error',
              400,
              HttpStatus.BAD_REQUEST,
            ),
          );
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
        adornoColor: colores, // Aquí ahora recibe los objetos completos
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
          error.message || 'Error al registrar el adorno',
          'error',
          400,
          HttpStatus.BAD_REQUEST,
        ),
      );
    }
  }

  // ======================= Eliminar adorno (cambia el estado a false)
  async delete(idAdorno: number) {
    try {
      const adorno = await this.adornoRepository.findOne({
        where: { idAdorno: idAdorno },
      });

      if (!adorno) {
        throw new BadRequestException(
          new MessageDto(
            'Adorno no encontrado',
            'error',
            400,
            HttpStatus.NOT_FOUND,
          ),
        );
      }

      adorno.estado = false;
      await this.adornoRepository.save(adorno);

      return new MessageDto(
        'Adorno eliminado correctamente',
        'success',
        200,
        HttpStatus.OK,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          error.message || 'Error al eliminar el adorno',
          'error',
          400,
          HttpStatus.BAD_REQUEST,
        ),
      );
    }
  }

  // ======================= Actualizar adorno
  async update(idAdorno: number, updateAdornoDto: UpdateAdornoDto) {
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
            404,
            HttpStatus.NOT_FOUND,
          ),
        );
      }

      const { adornoColor, tipoAdorno, ...adornoData } = updateAdornoDto;

      await this.adornoRepository.update(idAdorno, adornoData);

      adorno = await this.adornoRepository.findOne({
        where: { idAdorno },
        relations: ['adornoColor'],
      });

      if (tipoAdorno) {
        const tipoAdornoEntity = await this.catalogoRepository.findOne({
          where: { idCatalogo: tipoAdorno.idCatalogo },
        });

        if (!tipoAdornoEntity) {
          throw new BadRequestException(
            new MessageDto(
              'Tipo de adorno no válido',
              'error',
              400,
              HttpStatus.BAD_REQUEST,
            ),
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
            new MessageDto(
              'Uno o más colores no existen',
              'error',
              400,
              HttpStatus.BAD_REQUEST,
            ),
          );
        }

        adorno.adornoColor = coloresRelacionados;
      }
      await this.adornoRepository.save(adorno);

      return new MessageDto(
        'Adorno actualizado correctamente',
        'success',
        200,
        idAdorno,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          error.message || 'Error al actualizar el adorno',
          'error',
          400,
          HttpStatus.BAD_REQUEST,
        ),
      );
    }
  }
}
