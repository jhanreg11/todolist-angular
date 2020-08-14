import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TodoPageComponent } from './todos/todo-page/todo-page.component';

const routes: Routes = [
  { path: 'landing', component: LandingPageComponent },
  { path: 'home', component: TodoPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
