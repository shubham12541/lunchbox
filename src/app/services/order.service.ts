import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import {Order} from '../model/order';

@Injectable()
export class OrderService{
    private order: FirebaseListObservable<any[]>;
    private price: FirebaseObjectObservable<any>;

    private priceValue: number;

    constructor(af: AngularFire){
        const orderPath = '/orders';
        const pricePath = '/price';
        this.order = af.database.list(orderPath);
        this.price = af.database.object(pricePath);
    }

    setPrice(price: number){
        this.price.set({price: price});
    }

    updatePrice(price: number){
        this.price.update({price: price});
    }

    getPrice(){
        return this.price;
    }

    saveOrder(order: Order){
        return this.order.push(order);
    }

    removeOrder(order: Order){
        return this.order.remove(order.id);
    }

    updateOrder(order: Order, change: any){
        return this.order.update(order.id, change);
    }
}