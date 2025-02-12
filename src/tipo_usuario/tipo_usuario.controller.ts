import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TipoUsuarioService } from './tipo_usuario.service';
import { CreateTipoUsuarioDto } from './dto/create_tipo.dto';

@Controller('tipoUsuario')
export class TipoUsuarioController {
  constructor(private tipoUsuarioService: TipoUsuarioService) {}

  @Get()
  getTipoUsuarioList() {
    return this.tipoUsuarioService.getAll();
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  createTipoUsuario(@Body() nuevoTipoUsuario: CreateTipoUsuarioDto) {
    return this.tipoUsuarioService.create(nuevoTipoUsuario);
  }
}
