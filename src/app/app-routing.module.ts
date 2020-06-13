import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyHttpObservableComponent } from './my-http-observable/my-http-observable.component';


const routes: Routes = [
  { path: 'http', component: MyHttpObservableComponent },
  { path: '', pathMatch: 'full', redirectTo: 'http' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
