import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/tramite' },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./pages/usuario/usuario.module').then(m => m.UsuarioModule)
  },
  {
    path: 'marca',
    loadChildren: () => import('./pages/marca/marca.module').then(m => m.MarcaModule)
  },
  {
    path: 'encuesta',
    loadChildren: () => import('./pages/encuesta/encuesta.module').then(m => m.EncuestaModule)
  },
  {
    path: 'tramite',
    loadChildren: () => import('./pages/tramite/tramite.module').then(m => m.TramiteModule)
  },
  {
    path: 'tipo-identificacion',
    loadChildren: () => import('./pages/tipo-identificacion/tipo-identificacion.module').then(m => m.TipoIdentificacionModule)
  },
  {
    path: 'persona',
    loadChildren: () => import('./pages/persona/persona.module').then(m => m.PersonaModule)
  },
  {
    path: 'departamento',
    loadChildren: () => import('./pages/departamento/departamento.module').then(m => m.DepartamentoModule)
  },
  {
    path: 'empleado',
    loadChildren: () => import('./pages/empleado/empleado.module').then(m => m.EmpleadoModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
