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
import { AdornoService } from './adorno.service';
import { CreateAdornoDto } from './dto/create-adorno.dto';
import { UpdateAdornoDto } from './dto/update-adorno.dto';

@Controller('adorno')
export class AdornoController {
  constructor(private readonly adornoService: AdornoService) {}

  // ======== Listar todos los adornos
  @Get()
  async getList() {
    return await this.adornoService.getList();
  }

  // ======== Listar adorno por id
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) idAdorno: number) {
    return await this.adornoService.getById(idAdorno);
  }

  // ======== Crear un adorno
  @Post()
  async create(@Body() createAdornoDto: CreateAdornoDto) {
    return await this.adornoService.create(createAdornoDto);
  }

  // ======== Actualizar un adorno
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) idAdorno: number,
    @Body() updateAdornoDto: UpdateAdornoDto,
  ) {
    return await this.adornoService.update(idAdorno, updateAdornoDto);
  }

  // ======== Eliminar un adorno
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) idAdorno: number) {
    return await this.adornoService.delete(idAdorno);
  }
}
