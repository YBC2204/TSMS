import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDto, UserService, CreateUserRequest } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  hidePassword = true;
  roles = ['ADMIN', 'ACCOUNTANT', 'ANONYMOUS'];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<UserFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: UserDto | null
  ) {}

  ngOnInit(): void {
    this.isEdit = !!this.data;
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      userName: [this.data?.userName || '', Validators.required],
      email: [this.data?.email || '', [Validators.email]],
      phoneNumber: [this.data?.phoneNumber || ''],
      password: ['', this.isEdit ? [] : [Validators.required]],
      role: [this.data?.role || 'ACCOUNTANT', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const formValue = this.form.value;
    const request: CreateUserRequest = {
      userName: formValue.userName,
      email: formValue.email,
      phoneNumber: formValue.phoneNumber,
      password: formValue.password,
      role: formValue.role
    };

    const obs = this.isEdit
      ? this.userService.update(this.data!.id!, request)
      : this.userService.create(request);

    obs.subscribe({
      next: () => {
        this.snackBar.open(
          `User ${this.isEdit ? 'updated' : 'created'} successfully`,
          'Close', { duration: 3000 }
        );
        this.dialogRef.close(true);
      },
      error: (err) => {
        const msg = err.error?.message || 'Error saving user';
        this.snackBar.open(msg, 'Close', { duration: 3000 });
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
