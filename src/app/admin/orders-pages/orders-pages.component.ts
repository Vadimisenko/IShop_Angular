import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {OrderService} from "../../shared/order.service";

@Component({
  selector: 'app-orders-pages',
  templateUrl: './orders-pages.component.html',
  styleUrls: ['./orders-pages.component.scss']
})
export class OrdersPagesComponent implements OnInit {

  orders = []
  oSubscribe: Subscription
  rSubscribe: Subscription

  constructor(
    private  orderServ: OrderService
  ) { }

  ngOnInit(): void {
    this.oSubscribe = this.orderServ.getAll().subscribe( ord => {
      this.orders = ord
    })
  }

  ngOnDestroy() {
    if (this.oSubscribe) {
      this.oSubscribe.unsubscribe()
    }
    if (this.rSubscribe) {
      this.rSubscribe.unsubscribe()
    }
  }

  remove(id) {
    this.rSubscribe = this.orderServ.remove(id).subscribe(() => {
        this.orders = this.orders.filter( order => order.id !== id)
      }
    )
  }

}
