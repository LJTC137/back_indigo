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
import { AlquilerService } from './alquiler.service';
import { CreateAlquilerDto } from './dto/create-alquiler.dto';
import { UpdateAlquilerDto } from './dto/update-alquiler.dto';

@Controller('reserva')
export class AlquilerController {
  constructor(private readonly alquilerService: AlquilerService) {}

  // ======== Listar todos los alquileres
  @Get()
  async getList() {
    return await this.alquilerService.getList();
  }

  // ======== Obtener alquiler por ID
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) idAlquiler: number) {
    return await this.alquilerService.getById(idAlquiler);
  }

  // ======== Crear un alquiler
  @Post()
  async create(@Body() createAlquilerDto: CreateAlquilerDto) {
    return await this.alquilerService.create(createAlquilerDto);
  }

  // ======== Actualizar un alquiler
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) idAlquiler: number,
    @Body() updateAlquilerDto: UpdateAlquilerDto,
  ) {
    return await this.alquilerService.update(idAlquiler, updateAlquilerDto);
  }

  // ======== Eliminar un alquiler
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) idAlquiler: number) {
    return await this.alquilerService.delete(idAlquiler);
  }
}
