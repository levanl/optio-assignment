import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { UserListComponent } from './components/user-list/user-list.component';
import { HeaderComponent } from './layout/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './components/table/table.component';
import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientModule } from '@angular/common/http';
import { AddUserComponent } from './components/add-user/add-user.component';
import { MaterialModule } from './shared/material.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserListComponent,
    SearchbarComponent,
    TableComponent,
    AddUserComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CdkTableModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
