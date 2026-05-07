import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee, LookupCategory } from '../../models/models';
import { EmployeeService } from '../../services/employee.service';
import { LookupService } from '../../services/lookup.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  form!: FormGroup;
  jobPositions: LookupCategory[] = [];
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private lookupService: LookupService,
    private dialogRef: MatDialogRef<EmployeeFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Employee | null
  ) {}

  ngOnInit(): void {
    this.isEdit = !!this.data;
    this.loadJobPositions();
    this.initForm();
  }

  loadJobPositions(): void {
    this.lookupService.getByType('JOB_POSITION').subscribe({
      next: (data) => this.jobPositions = data
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      empName: [this.data?.empName || '', Validators.required],
      mobileNo: [this.data?.mobileNo || '', Validators.required],
      resAddr: [this.data?.resAddr || ''],
      jobPositionId: [this.data?.jobPosition?.id || null],
      doj: [this.data?.doj || null],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const formValue = this.form.value;
    const employee: Employee = {
      empName: formValue.empName,
      mobileNo: formValue.mobileNo,
      resAddr: formValue.resAddr,
      jobPosition: formValue.jobPositionId ? { id: formValue.jobPositionId } as LookupCategory : null,
      doj: formValue.doj,
    };

    const obs = this.isEdit
      ? this.employeeService.update(this.data!.empNo!, employee)
      : this.employeeService.create(employee);

    obs.subscribe({
      next: () => {
        this.snackBar.open(
          `Employee ${this.isEdit ? 'updated' : 'created'} successfully`,
          'Close', { duration: 3000 }
        );
        this.dialogRef.close(true);
      },
      error: () => this.snackBar.open('Error saving employee', 'Close', { duration: 3000 })
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
