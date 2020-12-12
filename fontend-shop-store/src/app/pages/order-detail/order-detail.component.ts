import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  constructor(private orderService: OrderService,
    private route: ActivatedRoute) {
  }

    order$: Observable<Order>;

    ngOnInit() {
      this.order$ = this.orderService.show(this.route.snapshot.paramMap.get('id'));
    }

}
