import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColorEntity } from './color.entity';
import { Repository } from 'typeorm';
import { MessageDto } from 'src/common/message.dto';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';

@Injectable()
export class ColorService {

    constructor(@InjectRepository(ColorEntity) private readonly colorRepository: Repository<ColorEntity>) { }

    // ======== Listar colores
    async getColoresList() {
        return await this.colorRepository.find()
    }

    // ======== Listar colores
    async getColorById(idColor: number) {
        const color = await this.colorRepository.find({ where: { idColor } });
        if (!color) {
            throw new BadRequestException(new MessageDto('Color no encontrado'))
        }
        return color;
    }

    // ======== Crear color
    async crearColor(createColorDto: CreateColorDto) {
        const color = this.colorRepository.create(createColorDto);
        await this.colorRepository.create(color);
        return new MessageDto('Color registrado');
    }

    // ======== Eliminar color
    async deleteColor(idColor: number, updateColorDto: UpdateColorDto) {
        const color = await this.colorRepository.find({ where: { idColor } })
        if (!color) {
            throw new BadRequestException(new MessageDto('Color no encontrado'))
        }
        updateColorDto.estado = false;
        await this.colorRepository.update({ idColor }, updateColorDto);
        return new MessageDto('Color eliminado');
    }

    // ======== Actualizar color
    async updateColor(idColor: number, updateColorDto: UpdateColorDto) {
        const color = await this.colorRepository.find({ where: { idColor } })
        if (!color) {
            throw new BadRequestException(new MessageDto('Color no encontrado'))
        };
        await this.colorRepository.update({ idColor }, updateColorDto);
        return new MessageDto('Color actualizado');
    }
}
