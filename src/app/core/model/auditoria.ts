export class Auditoria {

    private _idUserCreacion: number;
    private _idUserActualizacion: number;
    private _fechaActualizacion: Date;
    private _fechaCreacion: Date;

    constructor(idUserCreacion: number, idUserActualizacion: number, fechaActualizacion: Date, fechaCreacion: Date) {
        this._fechaActualizacion = fechaActualizacion;
        this._fechaCreacion = fechaCreacion;
        this._idUserCreacion = idUserCreacion;
        this._idUserActualizacion = idUserActualizacion;
    }

    public get idUserCreacion(): number {
        return this._idUserCreacion;
    }

    public set idUserCreacion(value: number) {
        this._idUserCreacion = value;
    }

    public get idUserActualizacion(): number {
        return this._idUserActualizacion;
    }
    public set idUserActualizacion(value: number) {
        this._idUserActualizacion = value;
    }

    public get fechaActualizacion(): Date {
        return this._fechaActualizacion;
    }
    public set fechaActualizacion(value: Date) {
        this._fechaActualizacion = value;
    }
    public get fechaCreacion(): Date {
        return this._fechaCreacion;
    }
    public set fechaCreacion(value: Date) {
        this._fechaCreacion = value;
    }
}
