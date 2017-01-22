import { Component, OnInit, Optional } from '@angular/core';
import {OrderService} from '../services/order.service';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';

import {MenuService} from '../services/menu.service';

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
    

    constructor(private orderService: OrderService, private menuService: MenuService, private _dialog: MdDialog, private _snackbar: MdSnackBar){
        
    }

    openDialog(){
        this.dialogRef = this._dialog.open(UserDialog, {
            disableClose: false
        });

        this.dialogRef.afterClosed().subscribe(result=>{
            console.log(result);
            this.lastDialogResult = result;
            this.dialogRef = null;
        });
    }

    ngOnInit(): void{
        this.price = this.menuService.getPrice();
        this.menu = this.menuService.getMenu();
    }

    showSnackBar(){
        this._snackbar.open('Order Placed Successfully', 'Dismiss');
    }
}

@Component({
    templateUrl: '../views/user-dialog.tmpl.html',
    styleUrls: ['../styles/style.scss', '../../custom_theme.scss'],
    providers: [MdSnackBar]
})
export class UserDialog{
    username: string = "John Cena";
    useraddress: string = "E-15, Sun City, Sector 54";
    userphone: string = "8894730166";

    constructor(@Optional() public dialogRef: MdDialogRef<UserDialog>, private _snackbar: MdSnackBar){

    }

    doOrder(){
        this.showSnackBar();    
    }   

    showSnackBar(){
        this._snackbar.open('Order Placed Successfully', 'Dismiss');
    }
}