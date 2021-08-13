import { Injectable } from '@angular/core';
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  nzPlacement: NzNotificationPlacement = 'topRight';
  constructor(private notification: NzNotificationService) {

  }

  public success(message: string): void {

    this.notification.blank(
      'Exitoso',
      message,
      {
        nzDuration: 3000,
        nzPauseOnHover: true,
        nzClass: 'notification-success',
        nzPlacement: this.nzPlacement
      }
    );
  }

  public error(message: string): void {

    this.notification.blank(
      'Error',
      message,
      {
        nzDuration: 5000,
        nzPauseOnHover: true,
        nzClass: 'notification-error',
        nzPlacement: this.nzPlacement
      }
    );
  }

  public warning(message: string, nzPlacement?: NzNotificationPlacement): void {

    this.notification.blank(
      'Advertencia',
      message,
      {
        nzDuration: 5000,
        nzPauseOnHover: true,
        nzClass: 'notification-warning',
        nzPlacement: nzPlacement ? nzPlacement : this.nzPlacement
      }
    );
  }

  createBasicNotification(type: string): void {
    const mensaje = 'Hola esta es una prueba de amor vas hablar tu care verga';
    this.notification.blank(
      '',
      '',
      {
        nzDuration: 900000,
        nzClass: type,
        nzData: mensaje
      }
    );
  }


}
