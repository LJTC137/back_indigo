import { BadRequestException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AsesorEntity } from './asesor.entity';
import { MessageDto } from 'src/common/message.dto';
import { CreateAsesorDto } from './dto/create-asesor.dto';
import { UpdateAsesorDto } from './dto/update-asesor.dto';

@Injectable()
export class AsesorService {
  constructor(
    @InjectRepository(AsesorEntity)
    private readonly asesorRepository: Repository<AsesorEntity>,
  ) {}

  // ======= Listar todos los asesores
  async getList(): Promise<AsesorEntity[]> {
    try {
      return await this.asesorRepository.find({ where: { estado: true } });
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al obtener la lista de asesores',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======= Obtener asesor por ID
  async getById(idAsesor: number): Promise<AsesorEntity> {
    try {
      const asesor = await this.asesorRepository.findOne({
        where: { idAsesor, estado: true },
      });

      if (!asesor) {
        throw new BadRequestException(
          new MessageDto(
            'Asesor no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      return asesor;
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al obtener el asesor',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======== Crear un nuevo asesor
  async create(createAsesorDto: CreateAsesorDto): Promise<MessageDto> {
    try {
      const asesor = this.asesorRepository.create(createAsesorDto);
      const savedAsesor = await this.asesorRepository.save(asesor);

      return new MessageDto(
        'Asesor registrado correctamente',
        'success',
        HttpStatus.CREATED,
        savedAsesor.idAsesor,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al registrar el asesor',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======== Actualizar un asesor existente
  async update(
    idAsesor: number,
    updateAsesorDto: UpdateAsesorDto,
  ): Promise<MessageDto> {
    try {
      const asesor = await this.asesorRepository.findOne({
        where: { idAsesor },
      });

      if (!asesor) {
        throw new BadRequestException(
          new MessageDto(
            'Asesor no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      await this.asesorRepository.update(idAsesor, updateAsesorDto);

      return new MessageDto(
        'Asesor actualizado correctamente',
        'success',
        HttpStatus.OK,
        idAsesor,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al actualizar el asesor',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }

  // ======== Eliminar un asesor (cambio de estado en lugar de borrado físico)
  async delete(idAsesor: number): Promise<MessageDto> {
    try {
      const asesor = await this.asesorRepository.findOne({
        where: { idAsesor },
      });

      if (!asesor) {
        throw new BadRequestException(
          new MessageDto(
            'Asesor no encontrado',
            'error',
            HttpStatus.NOT_FOUND,
            0,
          ),
        );
      }

      await this.asesorRepository.update(idAsesor, { estado: false });

      return new MessageDto(
        'Asesor eliminado correctamente',
        'success',
        HttpStatus.OK,
        idAsesor,
      );
    } catch (error) {
      throw new BadRequestException(
        new MessageDto(
          'Error al eliminar el asesor',
          'error',
          HttpStatus.BAD_REQUEST,
          0,
        ),
      );
    }
  }
}
