import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { GeneralResponse } from '../core/model/general-response';
import { Usuario } from '../core/model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  Url = '';
  path = '/usuario';

  UrlSeguridad = '';

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService, private router: Router) {

  }

  /*login(entity: Usuario): Observable<GeneralResponse<string>> {
    return this.http.post<GeneralResponse<string>>(this.Url + this.path + '/login', entity);
  }*/

  getAll(): Observable<GeneralResponse<Usuario[]>> {
    return this.http.get<GeneralResponse<Usuario[]>>('https://gorest.co.in/public/v1/users');
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    // Check whether the token is expired or null and return
    // true or false
    if (token == null) {
      return false;
    } else {
      return !this.jwtHelper.isTokenExpired(token);
    }
  }

  public checkUserRole(roleToCheck: string[] | string): boolean {
    const token = localStorage.getItem('access_token');
    // Check whether the token is expired or null and return
    // true or false
    if (token == null) {
      return false;
    } else {
      // get roles of user on token provided by server
      const rolesAssociated: Array<string> = this.getRolesUser();
      const result = rolesAssociated.some(row => roleToCheck.includes(row));
      return result;
    }
  }

  public isRoleRoot(): boolean {
    const token = localStorage.getItem('access_token');
    // Check whether the token is expired or null and return
    // true or false
    if (token == null) {
      return false;
    } else {
      // get roles of user on token provided by server
      const rolesAssociated: Array<string> = this.getRolesUser();
      const result = rolesAssociated.includes('ROLE_ROOT');
      return result;
    }
  }


  public getUserNombreApellido(): string[] {
    const token = localStorage.getItem('access_token');
    // console.log(token);
    if (token == null) {
      return [];
    } else {
      return this.getNombreApellido(token);
    }
  }

  public getIDUser(primaryKey?: boolean): number | null {
    const token = localStorage.getItem('access_token');
    // console.log(token);
    if (token == null) {
      return null;
    } else {
      if (!primaryKey) {
        return this.getID(token);
      }
      return this.getPrimaryKey(token);
    }
  }


  /**
   * Función encargada de deocodificar el Token JWT y obtener la lista de los códigos pertenecientes
   * a los roles que tiene asignados el usuario loggeado en el sistema
   * @param authToken Token del usuario
   */
  public getRolesUser(): Array<string> {
    const authToken = localStorage.getItem('access_token');
    const tokenDecode = this.jwtHelper.decodeToken(authToken || undefined).scopes;
    let rolesArraySplit = new Array();
    rolesArraySplit = tokenDecode.split(',');
    return rolesArraySplit;
  }

  /**
   * Función encargada de deocodificar el Token JWT y obtener la lista de los códigos pertenecientes
   * a los roles que tiene asignados el usuario loggeado en el sistema
   * @param authToken Token del usuario
   */
  private getNombreApellido(authToken: string): string[] {
    const nombres = this.jwtHelper.decodeToken(authToken).nombres;
    const apellidos = this.jwtHelper.decodeToken(authToken).apellidos;

    return [nombres, apellidos];
  }

  /**
   * Función encargada de deocodificar el Token JWT y obtener le ID del usuario
   * @param authToken Token del usuario
   */
  private getID(authToken: string): number {
    const sub = this.jwtHelper.decodeToken(authToken).sub;
    return +sub;
  }

  /**
   * Función encargada de deocodificar el Token JWT y obtener le ID del usuario
   * @param authToken Token del usuario
   */
  private getPrimaryKey(authToken: string): number {
    const jti = this.jwtHelper.decodeToken(authToken).jti;
    return +jti;
  }

  /**
   * Function to logout a user from the page
   */

  public logout(): void {
    this.router.navigate(['/login']);
    localStorage.clear();
    sessionStorage.clear();

  }


}
