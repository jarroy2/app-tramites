import { Auditoria } from './auditoria';

export class Marca extends Auditoria {
    
    private _id: number;
    private _nombre: string;


    constructor(id: number, nombre: string, idUserCreacion: number, idUserActualizacion: number, fechaActualizacion: Date, fechaCreacion: Date) {
        super(idUserCreacion, idUserActualizacion, fechaActualizacion, fechaCreacion);
        this._id = id;
        this._nombre = nombre;
    }

    public get id(): number {
        return this._id;
    }

    public get nombre(): string {
        return this._nombre;
    }
    public set nombre(value: string) {
        this._nombre = value;
    }
}