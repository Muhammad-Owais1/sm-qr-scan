import { RouterModule, Routes } from '@angular/router';
import { DirectorComponent } from './director/director.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: ':dynamic', component: DirectorComponent }, // Dynamic
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
