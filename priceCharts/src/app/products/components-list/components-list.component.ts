import { Component } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { ServAngService } from '../../serv-ang.service';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core'
import { iProduct } from '../iProduct'

@Component({
  selector: 'app-components-list',
  templateUrl: './components-list.component.html',
  styleUrls: ['./components-list.component.css']
})
export class ComponentsListComponent  implements OnInit {

    allProductsToShow: iProduct[] = [];

    constructor(private servPr: ServAngService) {
    }

    ngOnInit(): void {
      this.servPr.getResponse().subscribe(results => {this.allProductsToShow = results
        console.log(this.allProductsToShow);
        this.formatDate();
      })
    }

    formatDate(): void {
      this.allProductsToShow.forEach(prod => {
        console.log(prod);
        let date = prod.extractDate;
        let splitted = date.split(/[- : T]/);
        console.log(splitted);
        let dateMidForm =  new Date(Date.UTC(+splitted[0], +splitted[1]-1, +splitted[2]));
        console.log(dateMidForm);
        let dateFormatted = dateMidForm.getFullYear().toString()+'-'+(dateMidForm.getMonth()+1) +'-'+ ((+dateMidForm.getDate()+1).toString());
        console.log(dateFormatted);
        prod.extractDate = dateFormatted;
        console.log(prod);
      })
    }

  }
