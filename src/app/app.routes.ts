import { AllUsersCpmponent } from './components/all-user.component';
import { AppComponent } from './app.component';
import { AllOrdersComponent } from './components/all-orders.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', component: AppComponent},
    { path: 'allorders', component: AllOrdersComponent },
    { path: 'allusers', component: AllUsersCpmponent},
    { path: '', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{

}


