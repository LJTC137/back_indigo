import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  HttpStatus,
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

  // ======= Obtener lista de usuarios
  async getUsuariosList(): Promise<UsuarioEntity[]> {
    try {
      const usuarios = await this.authRepository.find();
      if (!usuarios.length) {
        throw new NotFoundException(
          new MessageDto(
            'No existe un listado de usuarios',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }
      return usuarios;
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al obtener la lista de usuarios',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======= Crear administrador
  async createAdmin(usuarioDto: CreateUsuarioDto): Promise<MessageDto> {
    try {
      const { identificacion, correo } = usuarioDto;

      const exists = await this.authRepository.findOne({
        where: [{ identificacion }, { correo }],
      });

      if (exists) {
        throw new BadRequestException(
          new MessageDto(
            'Usuario ya registrado',
            'error',
            HttpStatus.BAD_REQUEST,
            0,
          ),
        );
      }

      const rolAdmin = await this.tipoUsuarioRepository.findOne({
        where: { nombre_tipo_usuario: TipoEnum.ADMIN },
      });

      const rolUser = await this.tipoUsuarioRepository.findOne({
        where: { nombre_tipo_usuario: TipoEnum.USER },
      });

      if (!rolAdmin || !rolUser) {
        throw new InternalServerErrorException(
          new MessageDto(
            'Los roles aún no han sido creados',
            'error',
            HttpStatus.INTERNAL_SERVER_ERROR,
            0,
          ),
        );
      }

      const admin = this.authRepository.create(usuarioDto);
      admin.tipo_usuario = [rolAdmin, rolUser];

      const savedAdmin = await this.authRepository.save(admin);

      return new MessageDto(
        'Administrador creado correctamente',
        'success',
        HttpStatus.CREATED,
        savedAdmin.idUsuario,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al crear el administrador',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======= Iniciar sesión
  async login(dto: LoginUsuarioDto): Promise<{ token: string }> {
    try {
      const { correo, contrasenia } = dto;

      const usuario = await this.authRepository.findOne({
        where: { correo },
        relations: ['tipo_usuario'],
      });

      if (!usuario) {
        throw new UnauthorizedException(
          new MessageDto(
            'Usuario no existente',
            'error',
            HttpStatus.UNAUTHORIZED,
            0,
          ),
        );
      }

      const contraseniaOk = await compare(contrasenia, usuario.contrasenia);
      if (!contraseniaOk) {
        throw new UnauthorizedException(
          new MessageDto(
            'Contraseña incorrecta',
            'error',
            HttpStatus.UNAUTHORIZED,
            0,
          ),
        );
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
    } catch (error) {
      throw new UnauthorizedException(
        new MessageDto(
          'Error en la autenticación',
          'error',
          HttpStatus.UNAUTHORIZED,
          0,
        ),
      );
    }
  }

  // ======= Obtener usuario por ID
  async getUsuarioById(idUsuario: number): Promise<UsuarioEntity> {
    try {
      const usuario = await this.authRepository.findOne({
        where: { idUsuario },
      });

      if (!usuario) {
        throw new NotFoundException(
          new MessageDto(
            'Usuario no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      return usuario;
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al obtener el usuario',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======= Eliminar usuario (cambio de estado en lugar de borrado físico)
  async deleteUsuario(idUsuario: number): Promise<MessageDto> {
    try {
      const usuario = await this.authRepository.findOne({
        where: { idUsuario },
      });

      if (!usuario) {
        throw new NotFoundException(
          new MessageDto(
            'Usuario no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      await this.authRepository.update(idUsuario, { estado: false });

      return new MessageDto(
        'Usuario eliminado correctamente',
        'success',
        HttpStatus.OK,
        idUsuario,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al eliminar el usuario',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======= Actualizar usuario
  async updateUsuario(
    idUsuario: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<MessageDto> {
    try {
      await this.authRepository.update(idUsuario, updateUsuarioDto);

      return new MessageDto(
        'Usuario actualizado correctamente',
        'success',
        HttpStatus.OK,
        idUsuario,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al actualizar el usuario',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }
}
