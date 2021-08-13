import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralResponse } from '../core/model/general-response';
import { Persona } from '../core/model/persona';
import { Constantes } from '../util/constantes';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  URL = '';
  PATH = '/persona';

  constructor(private http: HttpClient) {
    this.URL = Constantes.URL + this.PATH;
  }

  getAll(): Observable<GeneralResponse<Persona[]>> {
    return this.http.get<GeneralResponse<Persona[]>>(this.URL)
  }

  getPersonaByTipoIdentificacionAndNumeroid(codigo: string, numeroId: number): Observable<GeneralResponse<Persona>> {
    return this.http.get<GeneralResponse<Persona>>(this.URL + '/identificacion/' + codigo + '/numero/' + numeroId);
}

  create(entity: Persona): Observable<GeneralResponse<Persona>> {
    return this.http.post<GeneralResponse<Persona>>(this.URL, entity);
  }

  update(entity: Persona): Observable<GeneralResponse<Persona>> {
    return this.http.put<GeneralResponse<Persona>>(this.URL, entity);
  }
}
