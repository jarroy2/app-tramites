import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoIdentificacionComponent } from './tipo-identificacion.component';

const routes: Routes = [
  {
    path: '',
    component: TipoIdentificacionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoIdentificacionRoutingModule { }
