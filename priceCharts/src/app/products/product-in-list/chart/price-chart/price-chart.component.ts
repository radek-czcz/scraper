import { Input, Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ChartDataProviderService } from '../../../../services/chart-data-provider/chart-data-provider.service';

@Component({
  selector: 'app-price-chart',
  templateUrl: './price-chart.component.html',
  styleUrls: ['./price-chart.component.css']
})
export class PriceChartComponent implements OnInit, AfterViewInit {

  _productKey: string = '';
  chart: any = [];

  idname: string = 'canvas' + this.makeid(4)

  constructor(private dataProvider: ChartDataProviderService) {}

  @Input()
  set productKey(inp: string) {
    this._productKey = inp;
  }

  ngAfterViewInit() {
    let chartData: {};

    this.dataProvider.prName = this._productKey;


    this.dataProvider.getChartData().subscribe(chartData => {
      let dateLabels: Array<string> = [];
      let prPrices: Array<number> = [];
      console.log(chartData);
      chartData.forEach(inp => {
        dateLabels.push(inp.extractDate);
        prPrices.push(inp.prPrice);
      })

      console.log(dateLabels);

      let ctx = document.getElementById(this.idname);
      this.chart = new Chart(this.idname, {
        type: 'bar',
        data: {
          labels: dateLabels,
          datasets: [
            {
              label: 'cena',
              data: prPrices,
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

    })




  }

  ngOnInit() {

  }

  makeid(length: number) {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
      }
      return result;
  }

  }
