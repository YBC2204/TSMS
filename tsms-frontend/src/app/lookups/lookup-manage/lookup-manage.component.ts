import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LookupCategory } from '../../models/models';
import { LookupService } from '../../services/lookup.service';

@Component({
  selector: 'app-lookup-manage',
  templateUrl: './lookup-manage.component.html',
  styleUrls: ['./lookup-manage.component.scss']
})
export class LookupManageComponent implements OnInit {
  lookupTypes = [
    { value: 'CUSTOMER_CATEGORY', label: 'Customer Category' },
    { value: 'JOB_POSITION', label: 'Job Position' },
    { value: 'BRAND', label: 'Brand' },
    { value: 'BRANCH', label: 'Branch' }
  ];

  selectedType = 'CUSTOMER_CATEGORY';
  lookups: LookupCategory[] = [];
  newLookupName = '';
  editingId: number | null = null;
  editingName = '';

  constructor(
    private lookupService: LookupService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadLookups();
  }

  loadLookups(): void {
    this.lookupService.getAllByType(this.selectedType).subscribe({
      next: (data) => this.lookups = data,
      error: () => this.snackBar.open('Error loading lookups', 'Close', { duration: 3000 })
    });
  }

  onTypeChange(): void {
    this.loadLookups();
    this.cancelEdit();
  }

  addLookup(): void {
    if (!this.newLookupName.trim()) return;

    const lookup: LookupCategory = {
      name: this.newLookupName.trim(),
      lookupType: this.selectedType,
      isActive: true
    };

    this.lookupService.create(lookup).subscribe({
      next: () => {
        this.snackBar.open('Lookup value added', 'Close', { duration: 3000 });
        this.newLookupName = '';
        this.loadLookups();
      },
      error: (err) => this.snackBar.open(err.error?.message || 'Error adding lookup', 'Close', { duration: 3000 })
    });
  }

  startEdit(lookup: LookupCategory): void {
    this.editingId = lookup.id!;
    this.editingName = lookup.name;
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editingName = '';
  }

  saveEdit(lookup: LookupCategory): void {
    const updated: LookupCategory = {
      ...lookup,
      name: this.editingName.trim()
    };

    this.lookupService.update(lookup.id!, updated).subscribe({
      next: () => {
        this.snackBar.open('Lookup value updated', 'Close', { duration: 3000 });
        this.cancelEdit();
        this.loadLookups();
      },
      error: () => this.snackBar.open('Error updating lookup', 'Close', { duration: 3000 })
    });
  }

  toggleActive(lookup: LookupCategory): void {
    const updated: LookupCategory = {
      ...lookup,
      isActive: !lookup.isActive
    };

    this.lookupService.update(lookup.id!, updated).subscribe({
      next: () => {
        this.loadLookups();
      },
      error: () => this.snackBar.open('Error toggling status', 'Close', { duration: 3000 })
    });
  }

  deleteLookup(id: number): void {
    if (confirm('Are you sure you want to delete this lookup value?')) {
      this.lookupService.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Lookup value deleted', 'Close', { duration: 3000 });
          this.loadLookups();
        },
        error: () => this.snackBar.open('Error deleting lookup', 'Close', { duration: 3000 })
      });
    }
  }

  getPlaceholder(): string {
    const selected = this.lookupTypes.find(type => type.value === this.selectedType);
    return selected ? `Enter New ${selected.label}` : 'Enter new lookup value';
  }
}
