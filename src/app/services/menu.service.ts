import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';


@Injectable()
export class MenuService{
    private menu: FirebaseListObservable<any[]>;
    private price: FirebaseObjectObservable<any>;

    constructor(af: AngularFire){
        const menuPath = '/menu';
        const pricePath = '/price';
        this.menu = af.database.list(menuPath);
        this.price = af.database.object(pricePath);

    }

    setMenu(menuitems: string[]){
        for(let item of menuitems){
            this.menu.push(item);
        }
    }

    getMenu(){
        return this.menu;
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
}