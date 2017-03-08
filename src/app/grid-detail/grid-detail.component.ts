import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { DbService } from '../db.service'
import { Order } from '../order'
import { OrderDetails } from '../orderDetails'

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-grid-detail',
  templateUrl: './grid-detail.component.html',
  styleUrls: ['./grid-detail.component.css']
})
export class GridDetailComponent implements OnInit {
  orderId: number;
  orderDetails: OrderDetails[];

  chartData = {
    type: 'doughnut',
    data: {},
    options: {}
  }
  type = 'doughnut';

  data:any = {
    labels: [],
    datasets: [
      {
        label: "My First dataset",
        data: [],
        backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ]
      },
    ]
  };
  options:any = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(private dbService:DbService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.orderId = this.route.snapshot.params['id'];
    this.dbService.getOrder(this.route.snapshot.params['id'])
      .then((details) => {
        this.orderDetails = details;
        this.orderDetails.forEach((item)=>{
          this.data.labels.push(item.Description);
          this.data.datasets[0].data.push(item.Quantity)
        })
      } );
  }
}
