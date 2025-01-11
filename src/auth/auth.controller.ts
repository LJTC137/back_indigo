import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUsuarioDto } from './dto/login.dto';
import { UpdateUsuarioDto } from 'src/usuario/dto/update-user.dto';
import { CreateUsuarioDto } from 'src/usuario/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() login: LoginUsuarioDto) {
    return this.authService.login(login);
  }

  @Post('nuevo')
  @UsePipes(new ValidationPipe())
  createUsuario(@Body() admin: CreateUsuarioDto) {
    return this.authService.createAdmin(admin);
  }

  @Get()
  getUsuarioList() {
    return this.authService.getUsuariosList();
  }

  @Get(':idUsuario')
  getUsuarioById(@Param('idUsuario') id: number) {
    return this.authService.getUsuarioById(id);
  }

  @Patch(':idUsuario')
  updateUsuario(
    @Param('idUsuario') id: number,
    @Body() usuario: UpdateUsuarioDto,
  ) {
    return this.authService.updateUsuario(id, usuario);
  }

  @Delete(':idUsuario')
  deleteUsuario(@Param('idUsuario') id: number) {
    return this.authService.deleteUsuario(id);
  }
}
