import { Order } from './../model/order';
import { Component, OnInit, Optional } from '@angular/core';
import {OrderService} from '../services/order.service';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';

import {MenuService} from '../services/menu.service';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'order-tab',
    templateUrl: '../views/order.component.html',
    styleUrls: ['../styles/style.scss', '../../custom_theme.scss'],
    providers: [MdSnackBar]
})

export class OrderComponent implements OnInit{
    price: FirebaseObjectObservable<any>;
    menu: FirebaseListObservable<any[]>;
    isDarkTheme: boolean = false;
    quantity: number;
    lastDialogResult: string;
    dialogRef: MdDialogRef<UserDialog>;
    quantity_alert: boolean = false;

    user_phone: boolean = false;
    user_name: boolean = false;
    user_address: boolean = false;
    order_status: boolean = false;
    order_success: boolean = false;

    order: Order;

    thaliPrice: number;

    userName: string = '';
    userAddress: string = '';
    userPhone: string = '';

    constructor(private orderService: OrderService, private menuService: MenuService, private _dialog: MdDialog, private _snackbar: MdSnackBar){
        
    }

    openDialog(){
        if(this.quantity < 2 || this.quantity === undefined){
            this.quantity_alert = true;
        } else{
            this.quantity_alert = false;
            // this.dialogRef = this._dialog.open(UserDialog, {
            //     disableClose: false
            // });

            // this.dialogRef.afterClosed().subscribe(result=>{
            //     console.log(result);
            //     this.lastDialogResult = result;
            //     this.dialogRef = null;
            // });
            
            $('#myModal').modal({backdrop: false});
            // $('#myModal').modal('toggle');
        }
    }

    isValidNumber(value: string): boolean{
        if(value===''){
            return false;
        } else{
            return value.match(/\d/g).length===10;
        }
    }

    ngOnInit(): void{
        this.price = this.menuService.getPrice();
        this.menu = this.menuService.getMenu();

        this.price.subscribe(res=>{
            this.thaliPrice = res.price;
        });
    }

    showSnackBar(){
        this._snackbar.open('Order Placed Successfully', 'Dismiss');
    }

    placeOrder(){
        console.log(this.userName +  " " + this.userPhone + " " + this.userAddress);
        if(this.userName===''){
            this.user_name = true;
        } else{
            this.user_name = false;
        }
        if(this.userAddress===''){
            this.user_address = true;
        } else{
            this.user_address = false;
        }
        if(!this.isValidNumber(this.userPhone)){
            this.user_phone = true;
        } else{
            this.user_phone = false;
        }


        if (!this.user_name && !this.user_address && !this.user_phone){
            this.order_status = true;
            this.order = {
                id: this.getId(),
                name: this.userName,
                address: this.userAddress,
                phone: this.userPhone,
                quantity: this.quantity,
                amount: this.thaliPrice * this.quantity
            };

            this.orderService.saveOrder(this.order)
            .then(response=>{
                console.log('Order Placed Successfully');
                this.order_success = true;
            }).catch(err=>{
                console.log(this.handleError(err));
                this.order_success = false;
            });

            $('#myModal').modal('toggle');
        } else{

        }
    }


    handleError(err: Error){
        console.log(err);
    }

    getId(): string{
        var uuid:string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
        return uuid;
    }
}

@Component({
    selector: 'user-dialog',
    templateUrl: '../views/user-dialog.tmpl.html',
    styleUrls: ['../styles/style.scss', '../../custom_theme.scss'],
    providers: [MdSnackBar]
})
export class UserDialog{
    username: string = "John Cena";
    useraddress: string = "E-15, Sun City, Sector 54";
    userphone: string = "8894730166";

    constructor(public dialogRef: MdDialogRef<UserDialog>, private _snackbar: MdSnackBar){

    }

    doOrder(){
        this.dialogRef.close('done');
        this.showSnackBar();    
    }   

    showSnackBar(){
        this._snackbar.open('Order Placed Successfully', 'Dismiss');
    }
}