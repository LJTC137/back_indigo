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
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';

@Controller('color') // Ruta base para los colores
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  // ======== Listar todos los colores
  @Get()
  async getList() {
    return await this.colorService.getList();
  }

  // ======== Obtener un color por ID
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) idColor: number) {
    return await this.colorService.getById(idColor);
  }

  // ======== Crear un nuevo color
  @Post()
  async create(@Body() createColorDto: CreateColorDto) {
    return await this.colorService.create(createColorDto);
  }

  // ======== Actualizar un color
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) idColor: number,
    @Body() updateColorDto: UpdateColorDto,
  ) {
    return await this.colorService.update(idColor, updateColorDto);
  }

  // ======== Eliminar un color (eliminación lógica)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) idColor: number) {
    return await this.colorService.delete(idColor);
  }
}
