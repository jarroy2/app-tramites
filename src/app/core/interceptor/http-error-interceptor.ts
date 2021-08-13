import { Injectable } from '@angular/core';
import { HttpHandler, HttpRequest, HttpInterceptor, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NzModalService } from 'ng-zorro-antd/modal';
import { MessageService } from 'src/app/service/message.service';
import { NotificationService } from 'src/app/service/notification.service';
import { Constantes } from 'src/app/util/constantes';
import { UsuarioService } from 'src/app/service/usuario.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {


  constructor(private messageService: MessageService, private notification: NotificationService, private usuarioService: UsuarioService,
    private modal: NzModalService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError(error => {
        console.log('error', error);
        let errorMessage = '';
        if (error instanceof ErrorEvent) {
          // client-side error
          // errorMessage = `Client-side error: ${error.error.message}`;
          errorMessage = Constantes.NO_RESPONDE;
        }
        else {
          // backend error
          // errorMessage = `Server-side error: ${error.status} ${error.message}`;
          if (error instanceof HttpErrorResponse) {
            switch (error.status) {
              case 0:
                errorMessage = Constantes.NO_RESPONDE;
                this.messageService.error(errorMessage);
                break;
              case 400:
                errorMessage = error.error.apiError.messageUser;
                this.messageService.error(errorMessage);
                break;
              case 401:
                errorMessage = error.error.apiError.messageUser;
                this.modal.closeAll();
                this.modal.warning({
                  nzTitle: 'Advertencia',
                  nzContent: errorMessage
                });
                this.usuarioService.logout();
                break;
              case 403:
                if (error.error.apiError) {
                  errorMessage = error.error.apiError.messageUser;
                } else {
                  errorMessage = 'El rol del usuario no tiene acceso a esta opción';
                }
                this.messageService.error(errorMessage);
                break;
              case 406:
                errorMessage = error.error.apiError.messageUser;
                this.notification.error(errorMessage);
                break;
              case 500:
                errorMessage = Constantes.ERROR_500;
                console.log('error-500', error.error.message);
                this.messageService.error(errorMessage);
                break;
            }
          } else {
            errorMessage = error.message;
          }
        }
        // aquí podrías agregar código que muestre el error en alguna parte fija de la pantalla.
        return throwError(errorMessage);
      })
    );
  }

}


