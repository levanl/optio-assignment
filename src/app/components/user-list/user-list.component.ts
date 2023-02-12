import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, combineLatest, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { ApiListResponse } from 'src/app/interfaces/response.interface';
import { UserInfo } from 'src/app/interfaces/user.interface';
import { CommunicationService } from 'src/app/services/communication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  ELEMENT_DATA: UserInfo[] = [];
  pageSize: number = 10;
  pageIndex: number = 0;
  total: number = 0;
  destroy$: Subject<void> = new Subject()

  filter$: BehaviorSubject<any> = new BehaviorSubject({
    pageSize: 10,
    pageIndex: 0,
    search: ''
  })

  constructor(private userService: UserService, private communicationService: CommunicationService) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @Output() openSide: EventEmitter<void> = new EventEmitter()


  ngOnInit(): void {
    combineLatest([this.filter$, this.communicationService.listenForUpdateUsers()]).pipe(
      takeUntil(this.destroy$),
      switchMap(([filter, _]) => this.userService.getApiUsers(filter))
    ).subscribe((value: ApiListResponse<UserInfo>) => {
      this.ELEMENT_DATA = value.data.entities;
      this.total = value.data.total;
    })
  }

  onPageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize
    this.filter$.next({
      ...this.filter$.getValue(),
      pageSize: event.pageSize,
      pageIndex: event.pageIndex
    })
  }

  editUser(user: UserInfo) {
    this.communicationService.userFormValueUpdate(user);
  }

  openDrawer() {
    this.openSide.emit()
  }

  getInput(input: any) {
    this.pageIndex = 0
    this.filter$.next({
      ...this.filter$.getValue(),
      search: input ?? '',
      pageIndex: 0,
    })
  }

  deleteUser(id: string): void{
    this.userService.deleteUser(id).subscribe(() => {
      this.communicationService.usersUpdated();
    })
  }
}
