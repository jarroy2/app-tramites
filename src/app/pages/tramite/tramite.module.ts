import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TramiteRoutingModule } from './tramite-routing.module';
import { TramiteComponent } from './tramite.component';


@NgModule({
  declarations: [
    TramiteComponent
  ],
  imports: [
    CommonModule,
    TramiteRoutingModule
  ]
})
export class TramiteModule { }
