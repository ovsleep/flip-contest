import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service'
import { Order } from '../order'

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  orders: Order[];
  selected: Order;

  constructor(private dbService:DbService) { }

  ngOnInit() {
    this.dbService.getOrders()
      .then((orders) => { this.orders = orders; } );
  }

  selectOrder(order: Order){
    this.selected = order;
    alert(this.selected.OrderId);
  }
}
