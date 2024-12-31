import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocalEntity } from './local.entity';
import { Repository } from 'typeorm';
import { MessageDto } from 'src/common/message.dto';
import { CreateLocalDto } from './dto/create-local.dto';
import { UpdateLocalDto } from './dto/update-local.dto';

@Injectable()
export class LocalService {
  constructor(
    @InjectRepository(LocalEntity)
    private readonly localRepository: Repository<LocalEntity>,
  ) {}

  // ======= Listar todos los locales
  async getList() {
    try {
      return await this.localRepository.find({ where: { estado: true } });
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======= Listar local por id
  async getById(idLocal: number) {
    try {
      const local = await this.localRepository.find({
        where: { idLocal: idLocal, estado: true },
      });
      if (!local) {
        throw new BadRequestException(
          new MessageDto('No sea a encontrado el local'),
        );
      }
      return local;
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======== Crear local
  async create(createLocalDto: CreateLocalDto) {
    try {
      const local = this.localRepository.create(createLocalDto);
      await this.localRepository.save(local);
      return new MessageDto('Local registrado');
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======== Eliminar local
  async delete(idLocal: number, updateLocalDto: UpdateLocalDto) {
    try {
      const local = await this.localRepository.find({
        where: { idLocal: idLocal },
      });
      if (!local) {
        throw new BadRequestException(new MessageDto('Local no encontrado'));
      }
      updateLocalDto.estado = false;
      await this.localRepository.update({ idLocal }, updateLocalDto);
      return new MessageDto('Local eliminado');
    } catch (error) {
      return new MessageDto(error);
    }
  }

  // ======== Actualizar local
  async update(idLocal: number, updateLocalDto: UpdateLocalDto) {
    try {
      const local = await this.localRepository.find({
        where: { idLocal: idLocal },
      });
      if (!local) {
        throw new BadRequestException(new MessageDto('Local no encontrado'));
      }
      await this.localRepository.update({ idLocal }, updateLocalDto);
      return new MessageDto('Local actualizado');
    } catch (error) {
      return new MessageDto(error);
    }
  }
}
