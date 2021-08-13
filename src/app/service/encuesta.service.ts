import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Encuesta } from '../core/model/encuesta';
import { GeneralResponse } from '../core/model/general-response';
import { Constantes } from '../util/constantes';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  URL = '';
  PATH = '/encuesta';

  constructor(private http: HttpClient) {
    this.URL = Constantes.URL + this.PATH;
  }

  getAll(): Observable<GeneralResponse<Encuesta[]>> {
    return this.http.get<GeneralResponse<Encuesta[]>>(this.URL)
  }

  create(entity: Encuesta): Observable<GeneralResponse<Encuesta>> {
    return this.http.post<GeneralResponse<Encuesta>>(this.URL, entity);
  }

  update(entity: Encuesta): Observable<GeneralResponse<Encuesta>> {
    return this.http.put<GeneralResponse<Encuesta>>(this.URL, entity);
  }
}
