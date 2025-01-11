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
import { AdornoXAlquilerService } from './adorno_x_alquiler.service';
import { CreateAdornoXAlquilerDto } from './dto/create-adorno-alquiler.dto';
import { UpdateAdornoXAlquilerDto } from './dto/update-adorno-alquiler.dto';

@Controller('adorno-x-alquiler')
export class AdornoXAlquilerController {
  constructor(
    private readonly adornoXAlquilerService: AdornoXAlquilerService,
  ) {}

  // ======== Listar todos los adornos por alquiler
  @Get()
  async getList() {
    return await this.adornoXAlquilerService.getList();
  }

  // ======== Listar adornos por id de alquiler
  @Get(':id')
  async getByAlquilerId(@Param('id', ParseIntPipe) idAlquiler: number) {
    return await this.adornoXAlquilerService.getByAlquilerId(idAlquiler);
  }

  // ======== Crear un nuevo adorno por alquiler
  @Post()
  async create(@Body() createAdornoXAlquilerDto: CreateAdornoXAlquilerDto) {
    return await this.adornoXAlquilerService.create(createAdornoXAlquilerDto);
  }

  // ======== Actualizar adorno por alquiler
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) idAdornoXAlquiler: number,
    @Body() updateAdornoXAlquilerDto: UpdateAdornoXAlquilerDto,
  ) {
    return await this.adornoXAlquilerService.update(
      idAdornoXAlquiler,
      updateAdornoXAlquilerDto,
    );
  }

  // ======== Eliminar un adorno por alquiler
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) idAdornoXAlquiler: number) {
    return await this.adornoXAlquilerService.delete(idAdornoXAlquiler);
  }
}
