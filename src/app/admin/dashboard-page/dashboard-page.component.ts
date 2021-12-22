import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../shared/product.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  products = []
  pSubscribe: Subscription
  rSubscribe: Subscription
  productName

  constructor(
    private  productServ: ProductService
  ) { }

  ngOnInit(): void {
   this.pSubscribe = this.productServ.getAll().subscribe( prod => {
      this.products = prod
    })
  }

  ngOnDestroy() {
    if (this.pSubscribe) {
      this.pSubscribe.unsubscribe()
    }
    if (this.rSubscribe) {
      this.rSubscribe.unsubscribe()
    }
  }

  remove(id) {
    this.rSubscribe = this.productServ.remove(id).subscribe(() => {
      this.products = this.products.filter( product => product.id !== id)
      }
    )
  }

}
