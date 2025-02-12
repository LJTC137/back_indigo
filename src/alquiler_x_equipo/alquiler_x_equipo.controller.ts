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
import { AlquilerXEquipoService } from './alquiler_x_equipo.service';
import { CreateAlquilerXEquipoDto } from './dto/create-alquiler-equipo.dto';
import { UpdateAlquilerXEquipoDto } from './dto/update-alquiler-equipo.dto';

@Controller('reservaXEquipo')
export class AlquilerXEquipoController {
  constructor(
    private readonly alquilerXEquipoService: AlquilerXEquipoService,
  ) {}

  // ======== Listar todos los alquileres por equipo
  @Get()
  async getList() {
    return await this.alquilerXEquipoService.getList();
  }

  // ======== Obtener alquiler por equipo usando ID de alquiler
  @Get(':id')
  async getByAlquilerId(@Param('id', ParseIntPipe) idAlquiler: number) {
    return await this.alquilerXEquipoService.getByAlquilerId(idAlquiler);
  }

  // ======== Crear un nuevo alquiler por equipo
  @Post()
  async create(@Body() createAlquilerXEquipoDto: CreateAlquilerXEquipoDto) {
    return await this.alquilerXEquipoService.create(createAlquilerXEquipoDto);
  }

  // ======== Actualizar un alquiler por equipo
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) idAlquilerXEquipo: number,
    @Body() updateAlquilerXEquipoDto: UpdateAlquilerXEquipoDto,
  ) {
    return await this.alquilerXEquipoService.update(
      idAlquilerXEquipo,
      updateAlquilerXEquipoDto,
    );
  }

  // ======== Eliminar un alquiler por equipo
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) idAlquilerXEquipo: number) {
    return await this.alquilerXEquipoService.delete(idAlquilerXEquipo);
  }
}
