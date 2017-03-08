import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UploaderComponent } from './uploader/uploader.component';
import { RouterModule }   from '@angular/router';

//extrernal
import { ChartModule } from 'angular2-chartjs';

import { FlipperService } from './flipper.service';
import { DbService } from './db.service';
import { GridComponent } from './grid/grid.component';
import { GridDetailComponent } from './grid-detail/grid-detail.component'


@NgModule({
  declarations: [
    AppComponent,
    UploaderComponent,
    GridComponent,
    GridDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/flipper',
        pathMatch: 'full'
      },
     {
       path: 'flipper',
       component: UploaderComponent
     },
     {
       path: 'grid',
       component: GridComponent
     },
     {
       path: 'detail/:id',
       component: GridDetailComponent
     },
   ])
  ],
  providers: [
    FlipperService,
    DbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
