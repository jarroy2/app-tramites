import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralResponse } from '../core/model/general-response';
import { Marca } from '../core/model/marca';
import { Constantes } from '../util/constantes';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  URL = '';
  PATH = '/marca';

  constructor(private http: HttpClient) {
    this.URL = Constantes.URL + this.PATH;
  }

  getAll(): Observable<GeneralResponse<Marca[]>> {
    return this.http.get<GeneralResponse<Marca[]>>(this.URL)
  }

  create(entity: Marca): Observable<GeneralResponse<Marca>> {
    return this.http.post<GeneralResponse<Marca>>(this.URL, entity);
  }

  update(entity: Marca): Observable<GeneralResponse<Marca>> {
    return this.http.put<GeneralResponse<Marca>>(this.URL, entity);
  }
}
