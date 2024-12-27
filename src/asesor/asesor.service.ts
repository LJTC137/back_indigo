import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AsesorEntity } from './asesor.entity';
import { MessageDto } from 'src/common/message.dto';
import { CreateAsesorDto } from './dto/create-asesor.dto';
import { UpdateAsesorDto } from 'src/asesor/dto/update-asesor.dto';

@Injectable()
export class AsesorService {

    constructor(@InjectRepository(AsesorEntity) private readonly asesorRepository: Repository<AsesorEntity>) { }

    // ======= Listar todos los asesores
    async getAsesoresList() {
        return await this.asesorRepository.find();
    }

    // ======= Listar asesor por id
    async getAsesorById(idAsesor: number) {
        const asesor = await this.asesorRepository.find({ where: { idAsesor } })
        if (!asesor) {
            throw new BadRequestException(new MessageDto('No sea a encontrado el asesor'))
        }
        return asesor;
    }

    // ======== Crear asesor
    async createAsesor(createAsesorDto: CreateAsesorDto) {
        const asesor = this.asesorRepository.create(createAsesorDto);
        await this.asesorRepository.save(asesor);
        return new MessageDto('Asesor registrado');
    }

    // ======== Eliminar asesor
    async deleteAsesor(idAsesor: number, updateAsesorDto: UpdateAsesorDto) {
        const asesor = await this.asesorRepository.find({ where: { idAsesor } })
        if (!asesor) {
            throw new BadRequestException(new MessageDto('Asesor no encontrado'))
        }
        updateAsesorDto.estado = false;
        await this.asesorRepository.update({ idAsesor }, updateAsesorDto);
        return new MessageDto('Asesor eliminado');
    }

    // ======== Actualizar asesor
    async updateAsesor(idAsesor: number, updateAsesorDto: UpdateAsesorDto) {
        const asesor = await this.asesorRepository.find({ where: { idAsesor } })
        if (!asesor) {
            throw new BadRequestException(new MessageDto('Asesor no encontrado'))
        };
        await this.asesorRepository.update({ idAsesor }, updateAsesorDto);
        return new MessageDto('Asesor actualizado');
    }
}
