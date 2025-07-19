import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import {
  RowGroupingModule,
  ServerSideRowModelModule,
  ExcelExportModule,
} from 'ag-grid-enterprise';
import { ServerSideGrid } from './serverRender/serverSideGrid.component';
import { ImageCellRendererComponent } from './serverRender/imageCellRender.component';
import { HttpClientModule } from '@angular/common/http';
import { AgGridComponent } from './ag-grid/ag-grid.component';
import { FormsModule } from '@angular/forms';

ModuleRegistry.registerModules([
  AllCommunityModule,
  RowGroupingModule,
  ServerSideRowModelModule,
  ExcelExportModule,
]);

@NgModule({
  declarations: [
    AppComponent,
    ServerSideGrid,
    AgGridComponent,
    ServerSideGrid,
    ImageCellRendererComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
