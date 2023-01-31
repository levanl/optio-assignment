import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit{
  search = new FormControl()
  @Output() addUser: EventEmitter<void> = new EventEmitter()
  @Output() searchOutput: EventEmitter<string> = new EventEmitter()

  ngOnInit(): void {
    this.search.valueChanges.pipe(debounceTime(500)).subscribe((value: any) => {
      this.searchOutput.emit(value)
    })
  }
}
