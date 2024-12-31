import { BadRequestException, Injectable } from '@nestjs/common';
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

  // ======= Listar todos los productos
  async getList() {
    try {
      return await this.productoTecnicoRepository.find({
        where: { estado: true },
      });
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======= Listar producto por id
  async getById(idProducto: number) {
    try {
      const producto = await this.productoTecnicoRepository.find({
        where: { idProducto: idProducto, estado: true },
      });
      if (!producto) {
        throw new BadRequestException(
          new MessageDto('No sea a encontrado el producto'),
        );
      }
      return producto;
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======== Crear producto
  async create(createProductoTecnicoDto: CreateProductoTecnicoDto) {
    try {
      const producto = this.productoTecnicoRepository.create(
        createProductoTecnicoDto,
      );
      await this.productoTecnicoRepository.save(producto);
      return new MessageDto('Producto tecnico registrado');
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======== Eliminar producto
  async delete(
    idProducto: number,
    updateProductoTecnicoDto: UpdateProductoTecnicoDto,
  ) {
    try {
      const producto = await this.productoTecnicoRepository.find({
        where: { idProducto: idProducto },
      });
      if (!producto) {
        throw new BadRequestException(
          new MessageDto('Producto tecnico no encontrado'),
        );
      }
      updateProductoTecnicoDto.estado = false;
      await this.productoTecnicoRepository.update(
        { idProducto },
        updateProductoTecnicoDto,
      );
      return new MessageDto('Producto tecnico eliminado');
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======== Actualizar producto
  async update(
    idProducto: number,
    updateProductoTecnicoDto: UpdateProductoTecnicoDto,
  ) {
    try {
      const producto = await this.productoTecnicoRepository.find({
        where: { idProducto: idProducto },
      });
      if (!producto) {
        throw new BadRequestException(
          new MessageDto('Producto tecnico no encontrado'),
        );
      }
      await this.productoTecnicoRepository.update(
        { idProducto },
        updateProductoTecnicoDto,
      );
      return new MessageDto('Producto tecnico actualizado');
    } catch (error) {
      return new MessageDto(error);
    }
  }
}
