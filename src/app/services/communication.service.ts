import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CommunicationService {

    private usersUpdated$: BehaviorSubject<boolean> = new BehaviorSubject(true);

    constructor() {
        this.usersUpdated();
    }

    usersUpdated(): void{
        this.usersUpdated$.next(true);
    }

    listenForUpdateUsers(): Observable<boolean> {
        return this.usersUpdated$.asObservable()
    }

}