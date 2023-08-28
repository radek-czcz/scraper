import { NgModule, LOCALE_ID  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { registerLocaleData } from '@angular/common'
import { AppComponent } from './app.component';
import { ProductInListComponent } from './products/product-in-list/product-in-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatExpansionModule} from '@angular/material/expansion';
import { ComponentsListComponent } from './products/components-list/components-list.component';
import { PriceChartComponent } from './products/product-in-list/chart/price-chart/price-chart.component';
import localePl  from '@angular/common/locales/pl';

registerLocaleData(localePl);

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
  providers: [{provide: LOCALE_ID, useValue: 'pl-PL'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
