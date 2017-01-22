import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import {MaterialModule} from '@angular/material';

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
    AppComponent,
    OrderComponent,
    AboutComponent,
    UserDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [UserService, OrderService, MenuService],
  entryComponents: [UserDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
