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
import { LocalService } from './local.service';
import { CreateLocalDto } from './dto/create-local.dto';
import { UpdateLocalDto } from './dto/update-local.dto';

@Controller('local') // Ruta base para los locales
export class LocalController {
  constructor(private readonly localService: LocalService) {}

  // ======== Listar todos los locales
  @Get()
  async getList() {
    return await this.localService.getList();
  }

  // ======== Obtener local por ID
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) idLocal: number) {
    return await this.localService.getById(idLocal);
  }

  // ======== Crear un nuevo local
  @Post()
  async create(@Body() createLocalDto: CreateLocalDto) {
    return await this.localService.create(createLocalDto);
  }

  // ======== Actualizar local
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) idLocal: number,
    @Body() updateLocalDto: UpdateLocalDto,
  ) {
    return await this.localService.update(idLocal, updateLocalDto);
  }

  // ======== Eliminar un local (eliminación lógica)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) idLocal: number) {
    return await this.localService.delete(idLocal);
  }
}
