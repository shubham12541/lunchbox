import { FirebaseListObservable } from 'angularfire2';
import { Order } from './../model/order';
import { OrderService } from './../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'all-orders',
    templateUrl: '../views/all-orders.component.html',
    styleUrls: ['../styles/style.scss', '../../custom_theme.scss']
})

export class AllOrdersComponent implements OnInit {
    private allOrders: Order[];
    private totalQuantity: number = 0;
    private totalAmount: number = 0;

    constructor(private orderService: OrderService) { 

     }
     
    ngOnInit() { 
        this.orderService.getAllOrders().subscribe(res => {
            this.allOrders = res;
            for(var order of this.allOrders){
                this.totalQuantity += order.quantity;
                this.totalAmount += order.amount;
            }
        });
     }
}