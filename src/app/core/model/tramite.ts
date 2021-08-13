import { Auditoria } from './auditoria';

export class Tramite extends Auditoria {

    private _id: number;
    private _numero: number;
    private _ano: number;


    constructor(id: number, numero: number, ano: number, idUserCreacion: number, idUserActualizacion: number, fechaActualizacion: Date, fechaCreacion: Date) {
        super(idUserCreacion, idUserActualizacion, fechaActualizacion, fechaCreacion);
        this._id = id;
        this._numero = numero;
        this._ano = ano;
    }

}