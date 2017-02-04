import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import {User} from '../model/user';

@Injectable()
export class UserService{
    private userList: FirebaseListObservable<any[]>;

    constructor(af: AngularFire){
        const path = '/users';
        this.userList = af.database.list(path);
    }

    saveUser(user: User){
        return this.userList.push(user);
    }

    removeUser(user: User){
        return this.userList.remove(user.id);
    }

    updadeUser(user: User, change: any){
        return this.userList.update(user.id, change);
    }

}