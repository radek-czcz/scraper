import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule, LOCALE_ID  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { registerLocaleData } from '@angular/common'
import { AppComponent } from './app.component';
// import { ProductInListComponent } from './products/product-in-list/product-in-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
// import { ComponentsListComponent } from './products/components-list/components-list.component';
// import { PriceChartComponent } from './products/product-in-list/chart/price-chart/price-chart.component';
import localePl  from '@angular/common/locales/pl';
import { ChartDataProviderService } from './services/chart-data-provider/chart-data-provider.service'
import { ChartDataProvider2Service } from './services/chart-data-provider/chart-data-provider2.service'
import { ApiUrlsService } from './services/connections/api-urls.service';
import { DOMAIN_PORT_TOKEN } from './services/connections/connections.config';
import { FilteringChipComponent } from './filtering/filtering-chip/filtering-chip.component';
import { MatChipsModule } from '@angular/material/chips';
import { GetCategoriesService } from './services/get-categories/get-categories.service'
import { SelectedCategoriesService } from './services/selected-categories/selected-categories.service';
import { SelectedFiltersService } from './services/selected-filters/selected-filters.service';
import { FilteringPriceComponent } from './filtering/filtering-price/filtering-price.component'
import { MatRadioModule } from '@angular/material/radio';
import { AuthComponent } from './auth/auth/auth.component';
import { MatButtonModule } from '@angular/material/button';
import { PlayerComponentComponent } from './player/player-component/player-component.component'
import { PlayerService } from './services/player-service/player-service.service'
import { /*...,*/ APP_INITIALIZER } from '@angular/core';
import { AppConfigService } from './services/app-config/app-config.service';
import { CvComponent } from './cv/cv.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component'
import { ProductsModuleModule } from './products/products-module.module'

import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

export function setupAppConfigServiceFactory(service: AppConfigService): Function {
  return () => service.load();
}

registerLocaleData(localePl);

@NgModule({
  declarations: [
    AppComponent,
    // ProductInListComponent,
    // ComponentsListComponent,
    // PriceChartComponent,
    FilteringChipComponent,
    FilteringPriceComponent,
    AuthComponent,
    PlayerComponentComponent,
    CvComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    HttpClientModule,
    MatToolbarModule,
    MatChipsModule,
    MatRadioModule,
    MatButtonModule,
    AppRoutingModule,
    ProductsModuleModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: setupAppConfigServiceFactory, deps: [AppConfigService],multi: true},
    {provide: LOCALE_ID, useValue: 'pl-PL'},
    {provide: ChartDataProviderService, useClass: ChartDataProvider2Service},
    {provide: GetCategoriesService, useClass: GetCategoriesService},
    {provide: ApiUrlsService, useClass: ApiUrlsService},
    // {provide: DOMAIN_PORT_TOKEN, useValue: 'http://188.210.222.87:8000'},
    {provide: DOMAIN_PORT_TOKEN, useValue: 'http://localhost:8000'},
    {provide: SelectedCategoriesService, useClass: SelectedCategoriesService},
    {provide: SelectedFiltersService, useClass: SelectedFiltersService},
    {provide: PlayerService, useClass: PlayerService},
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
