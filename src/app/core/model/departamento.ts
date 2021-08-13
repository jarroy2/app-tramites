import { Auditoria } from './auditoria';

export class Departamento extends Auditoria {
    
    private _id: number;
    private _codigo: string;
    private _nombre: string;


    constructor(id: number, codigo: string, nombre: string, idUserCreacion: number, idUserActualizacion: number, fechaActualizacion: Date, fechaCreacion: Date) {
        super(idUserCreacion, idUserActualizacion, fechaActualizacion, fechaCreacion);
        this._id = id;
        this._codigo = codigo;
        this._nombre = nombre;
    }

    public get id(): number {
        return this._id;
    }

    public get codigo(): string {
        return this._codigo;
    }
    public set codigo(value: string) {
        this._codigo = value;
    }

    public get nombre(): string {
        return this._nombre;
    }
    public set nombre(value: string) {
        this._nombre = value;
    }
}