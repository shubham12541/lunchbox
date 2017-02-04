import { MainComponent } from './components/main.component';
import { AllOrdersComponent } from './components/all-orders.component';
import { AppRoutingModule } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import {MaterialModule} from '@angular/material';

import {ShareButtonsModule} from 'ng2-sharebuttons';
import 'hammerjs';

import { AppComponent } from './app.component';
import {OrderComponent, UserDialog} from './components/order.component';
import {AboutComponent} from './components/about.component';
import {OrderService} from './services/order.service';
import {UserService} from './services/user.service';
import {MenuService} from './services/menu.service';


export const firebaseConfig = {
  apiKey: "AIzaSyAwdKiLkQUPVswBTsIwFpuPlw3M4P6GtlM",
  authDomain: "lunchbox-277d2.firebaseapp.com",
  databaseURL: "https://lunchbox-277d2.firebaseio.com",
  storageBucket: "lunchbox-277d2.appspot.com",
  messagingSenderId: "658824285254"
}

@NgModule({
  declarations: [
    MainComponent,
    AppComponent,
    OrderComponent,
    AboutComponent,
    UserDialog,
    AllOrdersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ShareButtonsModule,
    MaterialModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [UserService, OrderService, MenuService],
  entryComponents: [UserDialog],
  bootstrap: [MainComponent]
})
export class AppModule { }
