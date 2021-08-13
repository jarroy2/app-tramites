import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoIdentificacionRoutingModule } from './tipo-identificacion-routing.module';
import { TipoIdentificacionComponent } from './tipo-identificacion.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TipoIdentificacionComponent
  ],
  imports: [
    CommonModule,
    TipoIdentificacionRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzGridModule,
    NzFormModule,
    NzInputModule
  ]
})
export class TipoIdentificacionModule { }
