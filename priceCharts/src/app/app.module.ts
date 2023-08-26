import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { ProductInListComponent } from './products/product-in-list/product-in-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatExpansionModule} from '@angular/material/expansion';
import { ComponentsListComponent } from './products/components-list/components-list.component';
import { PriceChartComponent } from './products/product-in-list/chart/price-chart/price-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductInListComponent,
    ComponentsListComponent,
    PriceChartComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
