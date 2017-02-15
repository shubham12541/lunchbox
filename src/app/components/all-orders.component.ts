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
    private totalFullQuantity: number = 0;
    private totalLightQuantity: number = 0;
    private totalAmount: number = 0;
    private _date: any;

    constructor(private orderService: OrderService) {

    }

    ngOnInit() {
        this.orderService.getAllOrders().subscribe(res => {
            this.allOrders = res;
            for (var order of this.allOrders) {
                this.totalFullQuantity += order.fullQuantity;
                this.totalLightQuantity += order.lightQuantity;
                this.totalAmount += order.amount;
            }
        });

        // this._date = this.getDate();
        this._date = Date.now();
        console.log(this._date);
    }

    getDate(): string{
        
        var today = new Date();
        var dd  = today.getDate();
        var mm = (today.getMonth() + 1); //January is 0!

        var dd_str: string;
        var mm_str: string;
        var yyyy: string;

        var yyyy = today.getFullYear().toString();
        if (dd < 10) {
            dd_str = '0' + dd;
            // dd = '0' + dd;
        } else{
            dd_str = dd.toString();
        }
        if (mm < 10) {
            mm_str = '0' + mm;
            // mm = '0' + mm;
        } else{
            mm_str = mm.toString();
        }
        var date = dd_str + '/' + mm_str + '/' + yyyy;

        return date;

    }
}