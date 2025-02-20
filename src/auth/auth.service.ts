import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
import { TipoUsuarioEntity } from 'src/tipo_usuario/tipo_usuario.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { Repository } from 'typeorm';
import { TipoEnum } from 'src/tipo_usuario/tipo_usuario.enum';
import { LoginUsuarioDto } from './dto/login.dto';
import { compare } from 'bcryptjs';
import { PayloadInterface } from './payload.interface';
import { JwtService } from '@nestjs/jwt';
import { UpdateUsuarioDto } from 'src/usuario/dto/update-user.dto';
import { CreateUsuarioDto } from 'src/usuario/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(TipoUsuarioEntity)
    private readonly tipoUsuarioRepository: Repository<TipoUsuarioEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly authRepository: Repository<UsuarioEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async getUsuariosList(): Promise<UsuarioEntity[]> {
    const usuarios = await this.authRepository.find();
    if (!usuarios.length)
      throw new NotFoundException(
        new MessageDto('No existe un listado de usuarios'),
      );
    return usuarios;
  }

  async createAdmin(usuario: CreateUsuarioDto): Promise<any> {
    const { identificacion, correo } = usuario;
    const exists = await this.authRepository.findOne({
      where: [{ identificacion: identificacion }, { correo: correo }],
    });
    if (exists) {
      throw new BadRequestException(new MessageDto('Usuario ya registrado'));
    }
    const rolAdmin = await this.tipoUsuarioRepository.findOne({
      where: { nombre_tipo_usuario: TipoEnum.ADMIN },
    });
    const rolUser = await this.tipoUsuarioRepository.findOne({
      where: { nombre_tipo_usuario: TipoEnum.USER },
    });
    if (!rolAdmin || !rolUser)
      throw new InternalServerErrorException(
        new MessageDto('los roles aún no han sido creados'),
      );
    const admin = this.authRepository.create(usuario);
    admin.tipo_usuario = [rolAdmin, rolUser];
    await this.authRepository.save(admin);
    return new MessageDto('Admin creado');
  }

  async login(dto: LoginUsuarioDto): Promise<any> {
    const { correo } = dto;
    const usuario = await this.authRepository.findOne({
      where: { correo: correo },
    });
    if (!usuario) {
      return new UnauthorizedException(new MessageDto('Usuario no existente'));
    }
    const contraseniaOk = await compare(dto.contrasenia, usuario.contrasenia);
    if (!contraseniaOk) {
      return new UnauthorizedException(new MessageDto('Contraseña erronea'));
    }

    const payload: PayloadInterface = {
      idUsuario: usuario.idUsuario,
      correo: usuario.correo,
      identificacion: usuario.identificacion,
      roles: usuario.tipo_usuario.map(
        (tipo_usuario) => tipo_usuario.nombre_tipo_usuario as TipoEnum,
      ),
    };
    const token = await this.jwtService.sign(payload);
    return { token };
  }

  async getUsuarioById(idUsuario: number) {
    return await this.authRepository.findOne({
      where: {
        idUsuario,
      },
    });
  }

  async deleteUsuario(idUsuario: number) {
    return this.authRepository.delete({ idUsuario });
  }

  async updateUsuario(idUsuario: number, updateUsuarioDto: UpdateUsuarioDto) {
    await this.authRepository.update(idUsuario, updateUsuarioDto);
  }
}
