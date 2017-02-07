import { User } from './../model/user';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'all-users',
    templateUrl: '../views/all-users.component.html',
    styleUrls: ['../styles/style.scss', '../../custom_theme.scss']
})
export class AllUsersCpmponent implements OnInit {
    private users: User[];
    constructor(private userService: UserService) {

     }

    ngOnInit() {
        this.userService.getAllUser().subscribe(res=>{
            this.users = res;
        });
     }
}