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
import { CatalogoService } from './catalogo.service';
import { CreateCatalogoDto } from './dto/create-catalogo.dto';
import { UpdateCatalogoDto } from './dto/update-catalogo.dto';

@Controller('catalogo')
export class CatalogoController {
  constructor(private readonly catalogoService: CatalogoService) {}

  // ======== Listar todos los catálogos
  @Get()
  async getList() {
    return await this.catalogoService.getList();
  }

  // ======== Obtener catálogo por ID
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) idCatalogo: number) {
    return await this.catalogoService.getById(idCatalogo);
  }

  // ======== Crear un nuevo catálogo
  @Post()
  async create(@Body() createCatalogoDto: CreateCatalogoDto) {
    return await this.catalogoService.create(createCatalogoDto);
  }

  // ======== Actualizar un catálogo
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) idCatalogo: number,
    @Body() updateCatalogoDto: UpdateCatalogoDto,
  ) {
    return await this.catalogoService.update(idCatalogo, updateCatalogoDto);
  }

  // ======== Eliminar un catálogo (eliminación lógica)
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) idCatalogo: number,
    @Body() updateCatalogoDto: UpdateCatalogoDto,
  ) {
    return await this.catalogoService.delete(idCatalogo, updateCatalogoDto);
  }
}
