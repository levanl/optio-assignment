import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { CommunicationService } from './services/communication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'optio-dashboard';
  opened: boolean = false;

  constructor(private communicationService: CommunicationService){}

  ngOnInit(): void {
    this.communicationService.listenForUserFormValue().pipe(
      filter(value => !!value)
    ).subscribe(() => {
      this.opened = true;
    })
  }
}