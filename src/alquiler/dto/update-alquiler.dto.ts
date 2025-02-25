import { IsBoolean, IsNumber } from "class-validator";

export class UpdateAlquilerDto{
    idAlquiler: number;
    
    fechaEvento?: Date;

    @IsNumber({ allowNaN: false, maxDecimalPlaces: 0 })
    cantidadPersonas?: number;

    horaInicio?: string;

    horaFin?: string;

    fechaRegistro?: Date;

    @IsNumber({ allowNaN: false, maxDecimalPlaces: 0 })
    cantidadSillas?: number;

    @IsNumber({ allowNaN: false, maxDecimalPlaces: 0 })
    cantidadMesas?: number;

    @IsNumber({}, { message: 'La cantidad de mesas y sillas debe ser un número' })
    cantidadPack?: number;
    
    @IsNumber({ allowNaN: false, maxDecimalPlaces: 0 })
    costoServicio?: number;

    @IsNumber({ allowNaN: false, maxDecimalPlaces: 0 })
    costoTotal?: number;
    
    @IsBoolean({ message: 'El campo estado solo puede ser un valor de si o no' })
    estado?: boolean;
    
    asesor?;
    estadoAlquiler?;
    tipoEvento?;
    local?;
    montaje?;
}