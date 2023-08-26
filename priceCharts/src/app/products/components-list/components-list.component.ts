import { Component } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { ServAngService } from '../../serv-ang.service';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core'
import { iProduct } from '../iProduct'
import { DateFormatterService } from '../../services/date-formatter.service'

@Component({
  selector: 'app-components-list',
  templateUrl: './components-list.component.html',
  styleUrls: ['./components-list.component.css']
})
export class ComponentsListComponent  implements OnInit {

    allProductsToShow: iProduct[] = [];

    constructor(private servPr: ServAngService, private dateFormatterService: DateFormatterService) {
    }

    ngOnInit(): void {
      this.servPr.getResponse().subscribe(results => {this.allProductsToShow = results
        console.log(this.allProductsToShow);
        //this.formatDate();
        //this.dateFormatterService.formatDate(this.allProductsToShow);
      })
    }
  }
