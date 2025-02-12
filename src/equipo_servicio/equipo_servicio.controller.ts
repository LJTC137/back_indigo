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
import { EquipoServicioService } from './equipo_servicio.service';
import { CreateEquipoServicioDto } from './dto/create-equipo-servicio.dto';
import { UpdateEquipoServicioDto } from './dto/update-equipo-servicio.dto';

@Controller('equipoServicio')
export class EquipoServicioController {
  constructor(private readonly equipoServicioService: EquipoServicioService) {}

  // ======== Listar todos los equipos
  @Get()
  async getList() {
    return await this.equipoServicioService.getList();
  }

  // ======== Obtener equipo por ID
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) idEquipo: number) {
    return await this.equipoServicioService.getById(idEquipo);
  }

  // ======== Crear un nuevo equipo
  @Post()
  async create(@Body() createEquipoServicioDto: CreateEquipoServicioDto) {
    return await this.equipoServicioService.create(createEquipoServicioDto);
  }

  // ======== Actualizar equipo
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) idEquipo: number,
    @Body() updateEquipoDto: UpdateEquipoServicioDto,
  ) {
    return await this.equipoServicioService.update(idEquipo, updateEquipoDto);
  }

  // ======== Eliminar un equipo (eliminación lógica)
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) idEquipo: number,
    @Body() updateEquipoDto: UpdateEquipoServicioDto,
  ) {
    return await this.equipoServicioService.delete(idEquipo, updateEquipoDto);
  }
}
