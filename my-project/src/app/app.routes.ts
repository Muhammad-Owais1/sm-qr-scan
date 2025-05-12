import { RouterModule, Routes } from '@angular/router';
import { DirectorComponent } from './director/director.component';
import { ReviewComponent } from './review/review.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: 'q/:dynamic', component: DirectorComponent },
  { path: 'r/:dynamic', component: ReviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
