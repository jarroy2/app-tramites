import { Auditoria } from './auditoria';
import { TipoIdentificacion } from './tipo-identificacion';

export class Persona extends Auditoria {

    private _id: number;
    private _tipoIdentificacion: TipoIdentificacion;
    private _numeroIdentificacion: number;
    private _nombres: string;
    private _apellidos: string;
    private _telefono: number;
    private _direccion: string;
    private _email: string;

    constructor(id: number, tipoIdentificacion: TipoIdentificacion, numeroIdentificacion: number, nombres: string, apellidos: string,
        telefono: number, email: string, direccion: string, idUserCreacion: number, idUserActualizacion: number, fechaActualizacion: Date, fechaCreacion: Date) {
        super(idUserCreacion, idUserActualizacion, fechaActualizacion, fechaCreacion);
        this._id = id;
        this._tipoIdentificacion = tipoIdentificacion;
        this._numeroIdentificacion = numeroIdentificacion;
        this._nombres = nombres;
        this._apellidos = apellidos;
        this._telefono = telefono;
        this._email = email;
        this._direccion = direccion;
    }

    public get id(): number {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }

    public get tipoIdentificacion(): TipoIdentificacion {
        return this._tipoIdentificacion;
    }
    public set tipoIdentificacion(value: TipoIdentificacion) {
        this._tipoIdentificacion = value;
    }

    public get numeroIdentificacion(): number {
        return this._numeroIdentificacion;
    }
    public set numeroIdentificacion(value: number) {
        this._numeroIdentificacion = value;
    }

    public get nombres(): string {
        return this._nombres;
    }
    public set nombres(value: string) {
        this._nombres = value;
    }

    public get apellidos(): string {
        return this._apellidos;
    }
    public set apellidos(value: string) {
        this._apellidos = value;
    }

    public get direccion(): string {
        return this._direccion;
    }
    public set direccion(value: string) {
        this._direccion = value;
    }

    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }

    public get telefono(): number {
        return this._telefono;
    }
    public set telefono(value: number) {
        this._telefono = value;
    }

}
