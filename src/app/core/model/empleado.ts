import { Auditoria } from './auditoria';
import { Departamento } from './departamento';
import { Persona } from './persona';

export class Empleado extends Auditoria {
    
    private _id: number;
    private _departamento: Departamento;
    private _persona: Persona;
    private _fechaIngreso: Date;


    constructor(id: number, departamento: Departamento, persona: Persona, fechaIngreso: Date, idUserCreacion: number, idUserActualizacion: number, fechaActualizacion: Date, fechaCreacion: Date) {
        super(idUserCreacion, idUserActualizacion, fechaActualizacion, fechaCreacion);
        this._departamento = departamento;
        this._persona = persona;
        this._fechaIngreso = fechaIngreso;
        this._id = id;
    }

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get persona(): Persona {
        return this._persona;
    }

    public set persona(value: Persona) {
        this._persona = value;
    }

    public get departamento(): Departamento {
        return this._departamento;
    }

    public set departamento(value: Departamento) {
        this._departamento = value;
    }

    public get fechaIngreso(): Date {
        return this._fechaIngreso;
    }
    public set fechaIngreso(value: Date) {
        this._fechaIngreso = value;
    }



}
