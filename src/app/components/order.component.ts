import { User } from './../model/user';
import { UserService } from './../services/user.service';
import { Order } from './../model/order';
import { Component, OnInit, Optional, Input, trigger, state, style, transition, animate } from '@angular/core';
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
    animations: [
        trigger('buttonHover', [
            state('inactive', style({
                transform: 'scale(1)'
            })),
            state('active', style({
                transform: 'scale(1.05)'
            })),
            transition('inactive => active', animate('250ms ease-in')),
            transition('active => inactive', animate('250ms ease-out'))
        ]),

        trigger('textMove', [
            state('inactive', style({
                transform: 'translateY(0)'
            })),
            state('active', style({
                transform: 'translateY(100%)'
            })),
            transition('inactive => active', animate('200ms') ),
            transition('active => inactive', animate('200ms') )
        ])
    ],
    providers: [MdSnackBar]
})

export class OrderComponent implements OnInit{
    price: FirebaseObjectObservable<any>;
    menu: FirebaseListObservable<any[]>;
    isDarkTheme: boolean = false;
    quantity: number = 2;
    fullMealQuantity = 0;
    lightMealQuantity = 0;
    lastDialogResult: string;
    dialogRef: MdDialogRef<UserDialog>;
    quantity_alert: boolean = false;

    state: string = "inactive";
    state2: string = "inactive";
    state3: string = "inactive";
    state4: string = "inactive";

    isMouseHover: boolean = false;

    user_phone: boolean = false;
    user_name: boolean = false;
    user_address: boolean = false;
    order_status: boolean = false;
    order_success: boolean = false;

    isUserDetail: boolean = false;

    order: Order;
    user: User;

    thaliPrice: number;

    userName: string = '';
    userAddress: string = '';
    userPhone: string = '';

    lightMealText: string = "Add to Cart";
    fullMealText: string = "Add to Cart";

    todayDate: number;

    constructor(private orderService: OrderService, private menuService: MenuService,
                private _dialog: MdDialog, private _snackbar: MdSnackBar, private userService: UserService){
        
    }

    toggleState(){
        this.state = this.state==='inactive' ? 'active' : 'inactive';
    }
    toggleState2(){
        this.state2 = this.state2==='inactive' ? 'active' : 'inactive';
    }
    toggleState3(){
        this.state3 = this.state3==='inactive' ? 'active' : 'inactive';
    }
    toggleState4(){
        this.state4 = this.state4==='inactive' ? 'active' : 'inactive';
    }

    toggleMouse(){
        this.isMouseHover = this.isMouseHover == true ? false : true;
    }

    showFullPrice(){
        this.fullMealText = "Rs. 80/-";
    }

    showLightPrice(){
        this.lightMealText = "Rs. 70/-";
    }

    defaultLight(){
        this.lightMealText = "Add to Cart";
    }

    defaultFull(){
        this.fullMealText = "Add to Cart";
    }

    openDialog(){
        if(this.quantity < 2 || this.quantity === undefined){
            this.quantity_alert = true;
        } else{
            this.quantity_alert = false;
            
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

        this.todayDate = Date.now();
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
                fullQuantity: this.fullMealQuantity,
                lightQuantity: this.lightMealQuantity,
                amount: this.fullMealQuantity*80 + this.lightMealQuantity*70,
                date: this.todayDate
            };

            this.user= {
                id: this.getId(),
                name: this.userName,
                phone:  this.userPhone,
                address: this.userAddress,
                date: this.todayDate
            };
            

            this.orderService.saveOrder(this.order)
            .then(response=>{
                console.log('Order Placed Successfully');
                this.order_success = true;
            }).catch(err=>{
                this.handleError(err);
                this.order_success = false;
            });

            this.userService.saveUser(this.user)
            .then(response=>{
                console.log("user saved successfully");
            })
            .catch(err=>{
                this.handleError(err);
            });
        } else{

        }
    }

    proceedOrder(){
        this.isUserDetail = true;
    }

    addLightMealToCart(){
        if(this.lightMealQuantity===0){
            this.lightMealQuantity = 1;
        }
    }

    addfullMealToCart(){
        if(this.fullMealQuantity===0){
            this.fullMealQuantity = 1;
        }
    }

    increaseFullMeal(){
        this.fullMealQuantity++;
    }

    decreaseFullMeal(){
        if(this.fullMealQuantity>=1){
            this.fullMealQuantity--;
        }
    }

    increaseLightMeal(){
        this.lightMealQuantity++;
    }

    decreaseLightMeal(){
        if(this.lightMealQuantity>=1){
            this.lightMealQuantity--;
        }
    }

    clear(){
        if (this.user_phone || this.user_name || this.user_address || this.userName.length!=0 || this.userAddress.length!=0 || this.userPhone.length!=0){
            this.user_phone     = false;
            this.user_name      = false;
            this.user_address   = false;

            this.userName = '';
            this.userAddress = '';
            this.userPhone = '';
        } else{
            this.isUserDetail = false;
        }
    }

    clearCart(){
        this.lightMealQuantity = 0;
        this.fullMealQuantity = 0;
        this.isUserDetail = false;
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

// FIXME: Not being used delete
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