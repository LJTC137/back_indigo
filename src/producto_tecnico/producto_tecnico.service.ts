import { BadRequestException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductoTecnicoEntity } from './producto_tecnico.entity';
import { MessageDto } from 'src/common/message.dto';
import { CreateProductoTecnicoDto } from './dto/create-producto.dto';
import { UpdateProductoTecnicoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductoTecnicoService {
  constructor(
    @InjectRepository(ProductoTecnicoEntity)
    private readonly productoTecnicoRepository: Repository<ProductoTecnicoEntity>,
  ) {}

  // ======= Listar todos los productos técnicos
  async getList(): Promise<ProductoTecnicoEntity[]> {
    try {
      return await this.productoTecnicoRepository.find({
        where: { estado: true },
        relations: ['tipoProducto', 'estadoEquipo'],
      });
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al obtener la lista de productos técnicos',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======= Obtener producto técnico por ID
  async getById(idProducto: number): Promise<ProductoTecnicoEntity> {
    try {
      const producto = await this.productoTecnicoRepository.findOne({
        where: { idProducto, estado: true },
        relations: ['tipoProducto', 'estadoEquipo'],
      });

      if (!producto) {
        throw new BadRequestException(
          new MessageDto(
            'Producto técnico no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      return producto;
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al obtener el producto técnico',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======== Crear un nuevo producto técnico
  async create(
    createProductoTecnicoDto: CreateProductoTecnicoDto,
  ): Promise<MessageDto> {
    try {
      const producto = this.productoTecnicoRepository.create(
        createProductoTecnicoDto,
      );
      const savedProducto = await this.productoTecnicoRepository.save(producto);

      return new MessageDto(
        'Producto técnico registrado correctamente',
        'success',
        HttpStatus.CREATED,
        savedProducto.idProducto,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al registrar el producto técnico',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======== Actualizar un producto técnico existente
  async update(
    idProducto: number,
    updateProductoTecnicoDto: UpdateProductoTecnicoDto,
  ): Promise<MessageDto> {
    try {
      const producto = await this.productoTecnicoRepository.findOne({
        where: { idProducto },
      });

      if (!producto) {
        throw new BadRequestException(
          new MessageDto(
            'Producto técnico no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      await this.productoTecnicoRepository.update(
        idProducto,
        updateProductoTecnicoDto,
      );

      return new MessageDto(
        'Producto técnico actualizado correctamente',
        'success',
        HttpStatus.OK,
        idProducto,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al actualizar el producto técnico',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======== Eliminar un producto técnico (cambio de estado en lugar de borrado físico)
  async delete(idProducto: number): Promise<MessageDto> {
    try {
      const producto = await this.productoTecnicoRepository.findOne({
        where: { idProducto },
      });

      if (!producto) {
        throw new BadRequestException(
          new MessageDto(
            'Producto técnico no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      await this.productoTecnicoRepository.update(idProducto, {
        estado: false,
      });

      return new MessageDto(
        'Producto técnico eliminado correctamente',
        'success',
        HttpStatus.OK,
        idProducto,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al eliminar el producto técnico',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }
}
