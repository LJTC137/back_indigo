import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductoTecnicoService } from './producto_tecnico.service';
import { CreateProductoTecnicoDto } from './dto/create-producto.dto';
import { UpdateProductoTecnicoDto } from './dto/update-producto.dto';

@Controller('producto-tecnico') // Ruta base para los productos técnicos
export class ProductoTecnicoController {
  constructor(
    private readonly productoTecnicoService: ProductoTecnicoService,
  ) {}

  // ======== Listar todos los productos técnicos
  @Get()
  async getList() {
    return await this.productoTecnicoService.getList();
  }

  // ======== Obtener producto técnico por ID
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) idProducto: number) {
    return await this.productoTecnicoService.getById(idProducto);
  }

  // ======== Crear un nuevo producto técnico
  @Post()
  async create(@Body() createProductoTecnicoDto: CreateProductoTecnicoDto) {
    return await this.productoTecnicoService.create(createProductoTecnicoDto);
  }

  // ======== Actualizar un producto técnico
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) idProducto: number,
    @Body() updateProductoTecnicoDto: UpdateProductoTecnicoDto,
  ) {
    return await this.productoTecnicoService.update(
      idProducto,
      updateProductoTecnicoDto,
    );
  }

  // ======== Eliminar un producto técnico (eliminación lógica)
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) idProducto: number,
    @Body() updateProductoTecnicoDto: UpdateProductoTecnicoDto,
  ) {
    return await this.productoTecnicoService.delete(
      idProducto,
      updateProductoTecnicoDto,
    );
  }
}
