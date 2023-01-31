import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';


@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatTableModule,
        MatSidenavModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatChipsModule
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatTableModule,
        MatSidenavModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatChipsModule
    ]
})
export class MaterialModule { }
