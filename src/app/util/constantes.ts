import { environment } from "src/environments/environment";

export class Constantes {
    public static readonly URL = environment.protocolo + environment.host;
    public static readonly NO_RESPONDE = 'Hay un problema de comunicación, revise su conexión a interne e intente más tarde';
    public static readonly ERROR_500 = 'Ha ocurrido un error interno, intente más tarde o comuniquese con soporte ténico';
}
