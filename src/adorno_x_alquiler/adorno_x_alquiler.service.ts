import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdornoXAlquilerEntity } from './adorno_x_alquiler.entity';
import { Repository } from 'typeorm';
import { MessageDto } from 'src/common/message.dto';
import { CreateAdornoXAlquilerDto } from './dto/create-adorno-alquiler.dto';
import { UpdateAdornoXAlquilerDto } from './dto/update-adorno-alquiler.dto';

@Injectable()
export class AdornoXAlquilerService {

    constructor(@InjectRepository(AdornoXAlquilerEntity) private readonly adornoXAlquilerRepository: Repository<AdornoXAlquilerEntity>) { }

    // ======= Listar todos los adonorsXAlquiler
    async getAdornoXAlquilerList() {
        return await this.adornoXAlquilerRepository.find();
    }

    // ======= Listar AdornoXAlquiler por id alquiler
    async getByAlquilerId(idAlquiler: number) {
        const adornoXAlquiler = await this.adornoXAlquilerRepository.find({ where: { alquiler: { idAlquiler: idAlquiler } } })
        if (!adornoXAlquiler) {
            throw new BadRequestException(new MessageDto('No sea a encontrado el adorno'))
        }
        return adornoXAlquiler;
    }

    // ======== Crear AdornoXAlquiler
    async createAdornoXAlquiler(createAdornoXAlquilerDto: CreateAdornoXAlquilerDto) {
        const adornoXAlquiler = this.adornoXAlquilerRepository.create(createAdornoXAlquilerDto);
        return await this.adornoXAlquilerRepository.save(adornoXAlquiler);
    }

    // ======== Actualizar adornoXAlquiler
    async updateAdornoXAlquiler(idAdornoXAlquiler: number, updateAdornoXAlquiler: UpdateAdornoXAlquilerDto) {
        const adornoXAlquiler = await this.adornoXAlquilerRepository.find({ where: { idAdornoXAlquiler } })
        if (!adornoXAlquiler) {
            throw new BadRequestException(new MessageDto('Adorno no encontrado'))
        };
        await this.adornoXAlquilerRepository.update({ idAdornoXAlquiler }, updateAdornoXAlquiler);
        return new MessageDto('Adorno actualizado');
    }
}
