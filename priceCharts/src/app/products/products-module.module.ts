import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsListComponent } from './components-list/components-list.component'
import { ProductInListComponent } from './product-in-list/product-in-list.component'
import { MatExpansionModule } from '@angular/material/expansion';
import { PriceChartComponent } from './product-in-list/chart/price-chart/price-chart.component';

@NgModule({
  declarations: [
    ComponentsListComponent,
    ProductInListComponent,
    PriceChartComponent
    ],
  imports: [
    CommonModule,
    MatExpansionModule
    ],
  exports: [
    ComponentsListComponent
    ]
})
export class ProductsModuleModule { }