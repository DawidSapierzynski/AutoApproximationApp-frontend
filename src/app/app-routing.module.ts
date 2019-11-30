import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeriesPropertiesComponent } from './series-properties/series-properties.component';


const routes: Routes = [
  {path: 'series-properties', component: SeriesPropertiesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
