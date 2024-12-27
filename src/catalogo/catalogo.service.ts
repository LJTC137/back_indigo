import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatalogoEntity } from './catalogo.entity';
import { Repository } from 'typeorm';
import { MessageDto } from 'src/common/message.dto';
import { CreateCatalogoDto } from './dto/create-catalogo.dto';
import { UpdateCatalogoDto } from './dto/update-catalogo.dto';

@Injectable()
export class CatalogoService {

    constructor(@InjectRepository(CatalogoEntity) private readonly catalogoRepository: Repository<CatalogoEntity>) { }

    // ======== Listar catalogos
    async getCatalogoList() {
        return await this.catalogoRepository.find()
    }

    // ======== Listar catalogos
    async getCatalogoById(idCatalogo: number) {
        const catalogo = await this.catalogoRepository.find({ where: { idCatalogo } });
        if (!catalogo) {
            throw new BadRequestException(new MessageDto('Catalogo no encontrado'))
        }
        return catalogo;
    }

    // ======== Crear catalogo
    async crearCatalogo(createCatalogoDto: CreateCatalogoDto) {
        const catalogo = this.catalogoRepository.create(createCatalogoDto);
        await this.catalogoRepository.create(catalogo);
        return new MessageDto('Catalogo registrado');
    }

    // ======== Eliminar catalogo
    async deleteCatalogo(idCatalogo: number, updateCatalogoDto: UpdateCatalogoDto) {
        const catalogo = await this.catalogoRepository.find({ where: { idCatalogo } })
        if (!catalogo) {
            throw new BadRequestException(new MessageDto('Catalogo no encontrado'))
        }
        updateCatalogoDto.estado = false;
        await this.catalogoRepository.update({ idCatalogo }, updateCatalogoDto);
        return new MessageDto('Catalogo eliminado');
    }

    // ======== Actualizar catalogo
    async updateCatalogo(idCatalogo: number, updateCatalogoDto: UpdateCatalogoDto) {
        const catalogo = await this.catalogoRepository.find({ where: { idCatalogo } })
        if (!catalogo) {
            throw new BadRequestException(new MessageDto('Catalogo no encontrado'))
        };
        await this.catalogoRepository.update({ idCatalogo }, updateCatalogoDto);
        return new MessageDto('Catalogo actualizado');
    }
}
