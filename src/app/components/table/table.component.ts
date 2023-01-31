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

  deleteUser(event: any, id: string): void{
    event.stopPropagation();
    event.preventDefault();
    this.deleteEvent.emit(id)

  }
}


