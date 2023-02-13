import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { map, Observable, startWith, take } from "rxjs";
import { RoleOption, UserInfo } from "src/app/interfaces/user.interface";
import { CommunicationService } from "src/app/services/communication.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"],
})
export class AddUserComponent implements OnInit {
  statuses: any[] = [
    { value: true, viewValue: "locked" },
    { value: false, viewValue: "unLocked" },
  ];

  form = new FormGroup({
    firstName: new FormControl(undefined, [Validators.required]),
    lastName: new FormControl(undefined, [Validators.required]),
    email: new FormControl(undefined, [Validators.required, Validators.email]),
    locked: new FormControl({ value: true, nonNullable: true }),
    roles: new FormArray([], [Validators.minLength(1)]),
    id: new FormControl(undefined)
  });

  roleAutocomplete = new FormControl();
  roleOptions: RoleOption[] = [];
  filteredRoles$: Observable<RoleOption[]> =
    this.roleAutocomplete.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value || ""))
    );
  currentUser: UserInfo | null = null

  @Output() userAddedEvent: EventEmitter<void> = new EventEmitter();
  @Output() closeEvent: EventEmitter<void> = new EventEmitter();

  constructor(
    private userService: UserService,
    private communicationService: CommunicationService
  ) {}

  ngOnInit(): void {
    this.userService
      .getUserRoles()
      .pipe(take(1))
      .subscribe(({ data: { entities } }) => {
        this.roleOptions = entities;
      });

    this.communicationService
      .listenForUserFormValue()
      .subscribe((userInfo: any) => {
        this.currentUser = userInfo;
        if(userInfo) {
          this.form.patchValue(userInfo)
        } else {
          this.form.reset();
        }
      })
  }

  private _filter(value: string): RoleOption[] {
    const filterValue = value.toLowerCase();

    return this.roleOptions.filter(
      (option) =>
        option.name.toLowerCase().includes(filterValue) &&
        !this.form.value.roles?.find((role) => role === option.code)
    );
  }

  addRole(role: string, event: any): void {
    event.stopPropagation();
    event.preventDefault();
    (this.form.get("roles") as FormArray).push(new FormControl(role));
    this.roleAutocomplete.reset();
  }

  removeRole(index: number): void {
    (this.form.get("roles") as FormArray).removeAt(index);
  }

  onSubmit(): void {
    this.userService.addUser(this.form.value as any).subscribe(() => {
      this.userAddedEvent.emit();
      this.communicationService.usersUpdated();
    });
  }
}