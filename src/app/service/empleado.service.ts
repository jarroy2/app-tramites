import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralResponse } from '../core/model/general-response';
import { Empleado } from '../core/model/empleado';
import { Constantes } from '../util/constantes';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  URL = '';
  PATH = '/empleado';

  constructor(private http: HttpClient) {
    this.URL = Constantes.URL + this.PATH;
  }

  getAll(): Observable<GeneralResponse<Empleado[]>> {
    return this.http.get<GeneralResponse<Empleado[]>>(this.URL)
  }

  create(entity: Empleado): Observable<GeneralResponse<Empleado>> {
    return this.http.post<GeneralResponse<Empleado>>(this.URL, entity);
  }

  update(entity: Empleado): Observable<GeneralResponse<Empleado>> {
    return this.http.put<GeneralResponse<Empleado>>(this.URL, entity);
  }
}
