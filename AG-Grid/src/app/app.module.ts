import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AgGridModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
