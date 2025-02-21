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
import { AsesorService } from './asesor.service';
import { CreateAsesorDto } from './dto/create-asesor.dto';
import { UpdateAsesorDto } from './dto/update-asesor.dto';

@Controller('asesor')
export class AsesorController {
  constructor(private readonly asesorService: AsesorService) {}

  // ======== Listar todos los asesores
  @Get()
  async getList() {
    return await this.asesorService.getList();
  }

  // ======== Obtener asesor por ID
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) idAsesor: number) {
    return await this.asesorService.getById(idAsesor);
  }

  // ======== Crear un nuevo asesor
  @Post()
  async create(@Body() createAsesorDto: CreateAsesorDto) {
    return await this.asesorService.create(createAsesorDto);
  }

  // ======== Actualizar un asesor
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) idAsesor: number,
    @Body() updateAsesorDto: UpdateAsesorDto,
  ) {
    return await this.asesorService.update(idAsesor, updateAsesorDto);
  }

  // ======== Eliminar un asesor
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) idAsesor: number) {
    return await this.asesorService.delete(idAsesor);
  }
}
