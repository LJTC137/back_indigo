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
import { CateringService } from './catering.service';
import { CreateCateringDto } from './dto/create-catering.dto';
import { UpdateCateringDto } from './dto/update-catering.dto';

@Controller('catering')
export class CateringController {
  constructor(private readonly cateringService: CateringService) {}

  // ======== Listar todos los catering
  @Get()
  async getList() {
    return await this.cateringService.getList();
  }

  // ======== Obtener catering por ID
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) idCatering: number) {
    return await this.cateringService.getById(idCatering);
  }

  // ======== Crear un nuevo catering
  @Post()
  async create(@Body() createCateringDto: CreateCateringDto) {
    return await this.cateringService.create(createCateringDto);
  }

  // ======== Actualizar un catering
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) idCatering: number,
    @Body() updateCateringDto: UpdateCateringDto,
  ) {
    return await this.cateringService.update(idCatering, updateCateringDto);
  }

  // ======== Eliminar un catering (eliminación lógica)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) idCatering: number) {
    return await this.cateringService.delete(idCatering);
  }
}
