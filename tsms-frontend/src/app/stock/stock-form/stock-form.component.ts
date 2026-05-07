import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Stock, LookupCategory } from '../../models/models';
import { StockService } from '../../services/stock.service';
import { LookupService } from '../../services/lookup.service';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.scss']
})
export class StockFormComponent implements OnInit {
  form!: FormGroup;
  brands: LookupCategory[] = [];
  isEdit = false;
  statusOptions = ['Available', 'In Use', 'Damaged', 'Under Repair'];

  constructor(
    private fb: FormBuilder,
    private stockService: StockService,
    private lookupService: LookupService,
    private dialogRef: MatDialogRef<StockFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Stock | null
  ) {}

  ngOnInit(): void {
    this.isEdit = !!this.data;
    this.loadBrands();
    this.initForm();
  }

  loadBrands(): void {
    this.lookupService.getByType('BRAND').subscribe({
      next: (data) => this.brands = data
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      stockItem: [this.data?.stockItem || '', Validators.required],
      brandId: [this.data?.brand?.id || null],
      siNumber: [this.data?.siNumber || ''],
      status: [this.data?.status || 'Available'],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const formValue = this.form.value;
    const stock: Stock = {
      stockItem: formValue.stockItem,
      brand: formValue.brandId ? { id: formValue.brandId } as LookupCategory : null,
      siNumber: formValue.siNumber,
      status: formValue.status,
    };

    const obs = this.isEdit
      ? this.stockService.update(this.data!.id!, stock)
      : this.stockService.create(stock);

    obs.subscribe({
      next: () => {
        this.snackBar.open(
          `Stock item ${this.isEdit ? 'updated' : 'created'} successfully`,
          'Close', { duration: 3000 }
        );
        this.dialogRef.close(true);
      },
      error: () => this.snackBar.open('Error saving stock item', 'Close', { duration: 3000 })
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
