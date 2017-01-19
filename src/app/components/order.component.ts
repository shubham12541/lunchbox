import { Component, OnInit } from '@angular/core';
import {OrderService} from '../services/order.service';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
    moduleId: module.id,
    selector: 'order-tab',
    templateUrl: '../views/order.component.html',
    styleUrls: ['../styles/style.scss']
})

export class OrderComponent implements OnInit{
    price: FirebaseObjectObservable<any>;

    constructor(private orderService: OrderService){
        
    }

    ngOnInit(): void{
        this.price = this.orderService.getPrice();
    }
}