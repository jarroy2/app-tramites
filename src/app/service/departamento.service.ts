import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departamento } from '../core/model/departamento';
import { GeneralResponse } from '../core/model/general-response';
import { Constantes } from '../util/constantes';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  URL = '';
  PATH = '/departamento';

  constructor(private http: HttpClient) {
    this.URL = Constantes.URL + this.PATH;
  }

  getAll(): Observable<GeneralResponse<Departamento[]>> {
    return this.http.get<GeneralResponse<Departamento[]>>(this.URL)
  }

  create(entity: Departamento): Observable<GeneralResponse<Departamento>> {
    return this.http.post<GeneralResponse<Departamento>>(this.URL, entity);
  }

  update(entity: Departamento): Observable<GeneralResponse<Departamento>> {
    return this.http.put<GeneralResponse<Departamento>>(this.URL, entity);
  }
}
