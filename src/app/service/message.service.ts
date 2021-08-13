import { Injectable } from '@angular/core';
import { NzMessageRef, NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private nzPauseOnHover = true;
  private nzDuration = 4000;

  constructor(private messageService: NzMessageService) {

  }

  public success(message: string): void {
    this.messageService.success(message, { nzDuration: this.nzDuration, nzPauseOnHover: this.nzPauseOnHover });
  }

  public error(message: string): void {
    this.messageService.error(message, { nzDuration: this.nzDuration, nzPauseOnHover: this.nzPauseOnHover });
  }

  public warning(message: string): void {
    this.messageService.warning(message, { nzDuration: this.nzDuration, nzPauseOnHover: this.nzPauseOnHover });
  }

  public loading(message: string): NzMessageRef {
    return this.messageService.loading(message, { nzDuration: 0 });
  }

  public remove(messageId: string): void {
    this.messageService.remove(messageId);
  }



  public background(message: string): any {
    this.messageService.loading(message, { nzPauseOnHover: this.nzPauseOnHover });
    const id = this.messageService.loading(message, { nzDuration: 0 }).messageId;
    return id;

  }

}
