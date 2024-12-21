import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ImagesEntity } from './images.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ImagesEntity)
    private readonly imagesRepository: Repository<ImagesEntity>,
  ) {}

  async guardarImagenes(
    entidadTipo: string,
    entidadId: number,
    urls: string[],
  ): Promise<ImagesEntity[]> {
    const imagenes = urls.map((url) => {
      const imagen = new ImagesEntity();
      imagen.url = url;
      imagen.entidadTipo = entidadTipo;
      imagen.entidadId = entidadId;
      return imagen;
    });

    return await this.imagesRepository.save(imagenes);
  }

  async obtenerImagenes(entidadTipo: string, entidadId: number): Promise<ImagesEntity[]> {
    return await this.imagesRepository.find({
      where: { entidadTipo, entidadId },
    });
  }
}
