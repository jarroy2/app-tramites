import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralResponse } from '../core/model/general-response';
import { TipoIdentificacion } from '../core/model/tipo-identificacion';
import { Constantes } from '../util/constantes';

@Injectable({
  providedIn: 'root'
})
export class TipoIdentificacionService {

  URL = '';
  PATH = '/tipo-identificacion';

  constructor(private http: HttpClient) {
    this.URL = Constantes.URL + this.PATH;
  }

  getAll(): Observable<GeneralResponse<TipoIdentificacion[]>> {
    return this.http.get<GeneralResponse<TipoIdentificacion[]>>(this.URL)
  }

  create(entity: TipoIdentificacion): Observable<GeneralResponse<TipoIdentificacion>> {
    return this.http.post<GeneralResponse<TipoIdentificacion>>(this.URL, entity);
  }

  update(entity: TipoIdentificacion): Observable<GeneralResponse<TipoIdentificacion>> {
    return this.http.put<GeneralResponse<TipoIdentificacion>>(this.URL, entity);
  }
}
