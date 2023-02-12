import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserInfo } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  displayedColumns: string[] = ['email', 'firstName', 'lastName', 'roles', 'action'];
  @Input() dataSource: UserInfo[] = [];

  @Output() deleteEvent: EventEmitter<string> = new EventEmitter()

  @Output() editEvent: EventEmitter<UserInfo> = new EventEmitter()

  
  editForm(id: number){
    let currentUser = this.dataSource.find((p) => {return p.id === id});
    this.editEvent.emit(currentUser)
  }


  deleteUser(event: any, id: string): void{
    event.stopPropagation();
    event.preventDefault();
    this.deleteEvent.emit(id)

  }
}


