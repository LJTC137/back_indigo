import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { diskStorage } from 'multer';
import * as path from 'path'; // Para manejar rutas dinámicas y extensiones de archivos
import { MessageDto } from 'src/common/message.dto';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('imagenes', 10, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          // Lógica para decidir la carpeta de destino según el tipo de entidad
          // Ejemplo: "Locales", "Adornos"
          const { entidadTipo } = req.body;
          const uploadPath = path.join(__dirname, '../../uploads', entidadTipo); // Ruta base
          cb(null, uploadPath); // Asignar la carpeta
        },
        filename: (req, file, cb) => {
          // Renombrar el archivo para evitar colisiones
          const timestamp = Date.now();
          const ext = path.extname(file.originalname); // Obtener la extensión del archivo
          const filename = `${file.fieldname}-${timestamp}${ext}`;
          cb(null, filename); // Guardar el archivo con el nuevo nombre
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // Tamaño máximo permitido (5MB)
    }),
  )
  async subirImagenes(
    @Body() body: { entidadTipo: string; entidadId: number },
    @UploadedFiles() archivos: Express.Multer.File[],
  ) {
    const urls = archivos.map(
      (archivo) => `/uploads/${body.entidadTipo}/${archivo.filename}`, // Ruta relativa para la API
    );
    return await this.imagesService.guardarImagenes(
      body.entidadTipo,
      body.entidadId,
      urls,
    );
  }

  @Get()
  async getImages(
    @Query('entidadTipo') entidadTipo: string,
    @Query('entidadId') entidadId: number,
  ) {
    // Valida que se hayan enviado los parámetros
    if (!entidadTipo || !entidadId) {
      throw new BadRequestException(
        new MessageDto(
          'Se requieren los parámetros entidadTipo y entidadId',
          'error',
          400,
          400,
        ),
      );
    }
    return await this.imagesService.obtenerImagenes(entidadTipo, entidadId);
  }
}
