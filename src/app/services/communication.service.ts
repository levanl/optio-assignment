import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserInfo } from '../interfaces/user.interface';

@Injectable({providedIn: 'root'})
export class CommunicationService {

    private usersUpdated$: BehaviorSubject<boolean> = new BehaviorSubject(true);
    private userFormValue$: BehaviorSubject<UserInfo | null> = new BehaviorSubject<UserInfo | null>(null);

    constructor() {
        this.usersUpdated();
    }

    usersUpdated(): void{
        this.usersUpdated$.next(true);
    }

    listenForUpdateUsers(): Observable<boolean> {
        return this.usersUpdated$
    }

    userFormValueUpdate(user: UserInfo | null): void {
        this.userFormValue$.next(user);
    }    

    listenForUserFormValue(): Observable<UserInfo | null> {
        return this.userFormValue$
    }
}