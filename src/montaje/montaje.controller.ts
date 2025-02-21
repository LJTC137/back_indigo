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
import { MontajeService } from './montaje.service';
import { CreateMontajeDto } from './dto/create-montaje.dto';
import { UpdateMontajeDto } from './dto/update-montaje.dto';

@Controller('montaje') // Ruta base para los montajes
export class MontajeController {
  constructor(private readonly montajeService: MontajeService) {}

  // ======== Listar todos los montajes
  @Get()
  async getList() {
    return await this.montajeService.getList();
  }

  // ======== Obtener montaje por ID
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) idMontaje: number) {
    return await this.montajeService.getById(idMontaje);
  }

  // ======== Crear un nuevo montaje
  @Post()
  async create(@Body() createMontajeDto: CreateMontajeDto) {
    return await this.montajeService.create(createMontajeDto);
  }

  // ======== Actualizar un montaje
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) idMontaje: number,
    @Body() updateMontajeDto: UpdateMontajeDto,
  ) {
    return await this.montajeService.update(idMontaje, updateMontajeDto);
  }

  // ======== Eliminar un montaje (eliminación lógica)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) idMontaje: number) {
    return await this.montajeService.delete(idMontaje);
  }
}
