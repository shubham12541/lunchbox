import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import {OrderComponent} from './components/order.component';
import {AboutComponent} from './components/about.component';
import {OrderService} from './services/order.service';
import {UserService} from './services/user.service';

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
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [UserService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
