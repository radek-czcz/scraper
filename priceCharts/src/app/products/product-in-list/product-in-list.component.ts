import { Component, Input } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { ServAngService } from '../../serv-ang.service';
import { Observable } from 'rxjs';
import { OnInit } from '@angular/core'
import { iProduct } from '../iProduct'
import { AuthService } from '../../auth/auth.service'

@Component({
  selector: 'app-product-in-list',
  templateUrl: './product-in-list.component.html',
  styleUrls: ['./product-in-list.component.css'],

  //standalone: true,
  //imports: [MatExpansionModule]
})
export class ProductInListComponent /*implements OnInit*/ {

@Input()
  pr: iProduct = {
    prName: '',
    prPrice: 0,
    prSeller: '',
    prCode: 0,
    extractDate: '',
  };

  constructor(public auth: AuthService) {
  }

  /*ngOnInit(): void {
    this.servPr.getResponse().subscribe(results => this.pr = results[0])
  }*/

}
