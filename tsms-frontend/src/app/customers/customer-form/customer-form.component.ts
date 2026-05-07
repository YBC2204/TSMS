import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Customer, LookupCategory, EquipmentDetail } from '../../models/models';
import { CustomerService } from '../../services/customer.service';
import { LookupService } from '../../services/lookup.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  form!: FormGroup;
  categories: LookupCategory[] = [];
  branches: LookupCategory[] = [];
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private lookupService: LookupService,
    private dialogRef: MatDialogRef<CustomerFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Customer | null
  ) {}

  ngOnInit(): void {
    this.isEdit = !!this.data;
    this.loadCategories();
    this.loadBranches();
    this.initForm();
  }

  loadCategories(): void {
    this.lookupService.getByType('CUSTOMER_CATEGORY').subscribe({
      next: (data) => this.categories = data
    });
  }

  loadBranches(): void {
    this.lookupService.getByType('BRANCH').subscribe({
      next: (data) => this.branches = data
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      customerName: [this.data?.customerName || '', Validators.required],
      address: [this.data?.address || ''],
      emailId: [this.data?.emailId || '', Validators.email],
      contactPerson: [this.data?.contactPerson || ''],
      mobileNo: [this.data?.mobileNo || '', Validators.required],
      alternativeMobNo: [this.data?.alternativeMobNo || ''],
      categoryId: [this.data?.category?.id || null],
      branchId: [this.data?.branch?.id || null],
      nearestLandmark: [this.data?.nearestLandmark || ''],
      distance: [this.data?.distance || null],
      equipmentDetails: this.fb.array([])
    });

    // Load existing equipment details if in edit mode
    if (this.data?.equipmentDetails && this.data.equipmentDetails.length > 0) {
      this.data.equipmentDetails.forEach(equipment => {
        this.addEquipment(equipment);
      });
    }
  }

  get equipmentDetails(): FormArray {
    return this.form.get('equipmentDetails') as FormArray;
  }

  createEquipmentFormGroup(equipment?: EquipmentDetail): FormGroup {
    return this.fb.group({
      id: [equipment?.id || null],
      equipmentName: [equipment?.equipmentName || '', Validators.required],
      quantity: [equipment?.quantity || 1, [Validators.required, Validators.min(1)]]
    });
  }

  addEquipment(equipment?: EquipmentDetail): void {
    this.equipmentDetails.push(this.createEquipmentFormGroup(equipment));
  }

  removeEquipment(index: number): void {
    this.equipmentDetails.removeAt(index);
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const formValue = this.form.value;
    const customer: Customer = {
      customerName: formValue.customerName,
      address: formValue.address,
      emailId: formValue.emailId,
      contactPerson: formValue.contactPerson,
      mobileNo: formValue.mobileNo,
      alternativeMobNo: formValue.alternativeMobNo,
      category: formValue.categoryId ? { id: formValue.categoryId } as LookupCategory : null,
      branch: formValue.branchId ? { id: formValue.branchId } as LookupCategory : null,
      nearestLandmark: formValue.nearestLandmark,
      distance: formValue.distance,
      equipmentDetails: formValue.equipmentDetails || []
    };

    const obs = this.isEdit
      ? this.customerService.update(this.data!.customerId!, customer)
      : this.customerService.create(customer);

    obs.subscribe({
      next: () => {
        this.snackBar.open(
          `Customer ${this.isEdit ? 'updated' : 'created'} successfully`,
          'Close', { duration: 3000 }
        );
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.snackBar.open('Error saving customer', 'Close', { duration: 3000 });
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
