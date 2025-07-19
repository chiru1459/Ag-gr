import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ServerSideGrid } from './serverRender/serverSideGrid.component';
import { AgGridComponent } from './ag-grid/ag-grid.component';

const routes: Routes = [
  { path: '', component: AgGridComponent },
  { path: 'serverGrid', component: ServerSideGrid },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
